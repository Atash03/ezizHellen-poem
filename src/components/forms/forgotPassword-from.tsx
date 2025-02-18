import { z } from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import poetService from "@/services/poet.service";
import { useLoginStore } from "@/store/useLogin";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import LoadingDots from "../shared/loading-dots";
import { CustomField } from "../shared/custom-field";
import { useGetStatic } from "@/query/use-get-static-words";
import { Spin } from "../shared";

const formsSchema = z.object({
  email: z.string().email("Email nädogry").email(),
});

type FormTypes = z.infer<typeof formsSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<FormTypes>({
    resolver: zodResolver(formsSchema),
    defaultValues: {
      email: "",
    },
  });

  const setLoginActive = useLoginStore((state) => state.setActive);
  const setStatus = useLoginStore((state) => state.setStatus);

  const loginError = useLoginStore((state) => state.loginError);
  const setLoginError = useLoginStore((state) => state.setLoginError);

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (data: FormTypes) => {
    const body = {
      email: data.email,
    };

    try {
      const res = await poetService.forgotPassword(body);
      if (res?.data?.message) {
        setStatus("reset");
      } else {
        setLoginError("Nasazlyk yuze cykdy");
      }
    } catch (e) {
      console.error(e);
      setLoginError("Email nädogry");
      setTimeout(() => setLoginError(""), 3000);
    }
  };

  const { data, isPending } = useGetStatic(15, "authData");

  if (isPending) return <Spin className="-translate-y-20" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 mt-16 relative px-[12px] md:px-0">
          <h3 className="text-center font-semibold">Öz emailyňyzy giriziň</h3>

          <div className="flex flex-col gap-6">
            <CustomField
              control={form.control}
              name={"email"}
              label={""}
              placeholder={"Emailyňyzy giriziň"}
              error={errors.email}
            />
          </div>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <LoadingDots /> : data?.[5]?.word}
          </Button>

          {loginError && (
            <h5 className="absolute bottom-5 text-ERROR text-[14px] font-medium">
              {loginError}
            </h5>
          )}

          <h5 className="text-16 transition-all">
            <Link
              onClick={() => {
                setLoginActive(false);
                setStatus("initial");
              }}
              className="text-TERTIARY tracking-normal hover:underline-offset-4 transition-all hover:underline"
              to="/instruction"
            >
              {data?.[6]?.word}
            </Link>
          </h5>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
