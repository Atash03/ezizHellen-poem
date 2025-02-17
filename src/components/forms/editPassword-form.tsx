import { z } from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import poetService from "@/services/poet.service";
import { useLoginStore } from "@/store/useLogin";
import { Button } from "../ui/button";
import LoadingDots from "../shared/loading-dots";
import { CustomField } from "../shared/custom-field";
import { useGetStatic } from "@/query/use-get-static-words";
import { Spin } from "../shared";

const formsSchema = z.object({
  email: z.string().email("Email nädogry").email(),
  token: z.string(),
  password: z
    .string()
    .min(8, "Açar sözi azyndan 8 nyşandan ybarat bolmaly")
    .regex(/[A-Za-z]/, "Açar sözüňizde harplar hökman bolmaly")
    .regex(/\d/, "Açar sözüňizde sanlar hökman bolmaly"),
  password_confirmation: z.string().min(8, "Açar sözi nädogry"),
});

type FormTypes = z.infer<typeof formsSchema>;

const EditPasswordForm = () => {
  const form = useForm<FormTypes>({
    resolver: zodResolver(formsSchema),
    defaultValues: {
      email: "",
    },
  });

  const setStatus = useLoginStore((state) => state.setStatus);

  const loginError = useLoginStore((state) => state.loginError);
  const setLoginError = useLoginStore((state) => state.setLoginError);

  const { isSubmitting, errors } = form.formState;

  const onSubmit = async (data: FormTypes) => {
    const body = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      token: data.token,
    };

    try {
      await poetService.resetPassword(body);
      setStatus("initial");
    } catch (e) {
      console.error(e);
      setLoginError("Email ya-da token nädogry");
      setTimeout(() => setLoginError(""), 3000);
    }
  };

  const { data, isPending } = useGetStatic(15, "authData");

  if (isPending) return <Spin className="-translate-y-20" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 relative">
          {/* <h3 className="text-center font-semibold">{data?.[0]?.word}</h3> */}

          <div className="flex flex-col gap-3 mb-2">
            <CustomField
              control={form.control}
              name={"email"}
              label={""}
              placeholder={"Emailyňyzy giriziň"}
              error={errors.email}
            />
            <CustomField
              control={form.control}
              name={"token"}
              label={""}
              placeholder={"Tokeni giriziň"}
              error={errors.token}
            />
            <CustomField
              control={form.control}
              name={"password"}
              label={""}
              placeholder={data?.[4]?.word}
              error={errors.token}
            />{" "}
            <CustomField
              control={form.control}
              name={"password_confirmation"}
              label={""}
              placeholder={data?.[4]?.word}
              error={errors.token}
            />
          </div>

          {loginError && (
            <h5 className="absolute bottom-3 text-ERROR text-[14px] font-medium">
              {loginError}
            </h5>
          )}

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <LoadingDots /> : data?.[5]?.word}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPasswordForm;
