import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import LoadingDots from "../shared/loading-dots";
import { useAuthStore } from "@/store/useAuthStore";
import poetService from "@/services/poet.service";
import { CustomField } from "../shared/custom-field";
import { useGetStatic } from "@/query/use-get-static-words";

const signUpSchema = z
  .object({
    first_name: z.string().min(2, "Adyňyz azyndan 2 nyşandan ybarat bolmaly"),
    email: z.string().email("Nädogry"),
    password: z
      .string()
      .min(8, "Açar sözi azyndan 8 nyşandan ybarat bolmaly")
      .regex(/[A-Za-z]/, "Açar sözüňizde harplar hökman bolmaly")
      .regex(/\d/, "Açar sözüňizde sanlar hökman bolmaly"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Açar sözüňiz gabat gelenok",
    path: ["password_confirmation"],
  });

type FormType = z.infer<typeof signUpSchema>;

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const setRegisterSuccess = useAuthStore().setRegisterSuccess;

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: FormType) => {
    const body = {
      first_name: data.first_name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    try {
      await poetService.postUser(body);

      setRegisterSuccess(true);
      form.reset();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEmailNextStep = async () => {
    const isEmailValid = await form.trigger("email");

    if (isEmailValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleNameValid = async () => {
    const isNameValid = await form.trigger("first_name");

    if (isNameValid) {
      setStep((prev) => prev + 1);
    }
  };

  const accessToken = useAuthStore((state) => state.accessToken);

  const { isSubmitting, errors } = form.formState;

  useEffect(() => {
    if (!accessToken) setStep(1);
  }, [accessToken]);

  const { data } = useGetStatic(13, "registerData");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "md:w-[640px] mx-auto flex flex-col xl:gap-6 md:gap-6 gap-8"
        )}
      >
        <h2 className="h2 kaushan md:!text-[36px] !text-[26px]">
          {data?.[2]?.word}
        </h2>

        <div
          className={cn(
            "leading-[150%] transition-opacity",
            (step !== 1 || accessToken) && "opacity-50 pointer-events-none"
          )}
        >
          <div className="mb-4 text-[18px] leading-[110%] md:leading-[150%] font-medium md:font-normal md:text-[24px]">
            {data?.[3]?.word}
          </div>

          <h4 className="font-semibold mb-2 leading-[150%] text-[20px] md:text-[24px]">
            {data?.[4]?.word}
          </h4>

          <h5 className="md:text-[18px] text-[16px] font-medium -tracking-wide leading-[145%] mb-6">
            {data?.[5]?.word}
          </h5>

          <CustomField
            disabled={step !== 1 || !!accessToken}
            label={data?.[6]?.word}
            control={form.control}
            placeholder={data?.[7]?.word}
            type="text"
            error={errors.email}
            name="email"
            className="mb-8"
          />

          <Button
            disabled={step !== 1 || !!accessToken}
            type="button"
            onClick={handleEmailNextStep}
            className="w-full"
          >
            {data?.[13]?.word}
          </Button>
        </div>

        <div
          className={cn(
            "leading-[150%] transition-opacity",
            (step !== 2 || !!accessToken) && "opacity-50 pointer-events-none"
          )}
        >
          <div className="mb-4 text-[18px] leading-[110%] md:leading-[150%] font-medium md:font-normal md:text-[24px]">
            {data?.[8]?.word}
          </div>

          <h4 className="font-semibold mb-2 leading-[150%] text-[20px] md:text-[24px]">
            {data?.[9]?.word}
          </h4>

          <h5 className="md:text-[18px] text-[16px] font-medium -tracking-wide leading-[145%] mb-6">
            {data?.[10]?.word}
          </h5>

          <CustomField
            disabled={step !== 2}
            label={data?.[11]?.word}
            control={form.control}
            placeholder={data?.[12]?.word}
            type="text"
            error={errors.first_name}
            name="first_name"
            className="mb-8"
          />

          <Button
            disabled={step !== 2}
            type="button"
            onClick={handleNameValid}
            className="w-full"
          >
            {data?.[13]?.word}
          </Button>
        </div>

        <div
          className={cn(
            "leading-[150%] transition-opacity",
            (step !== 3 || !!accessToken) && "opacity-50 pointer-events-none"
          )}
        >
          <div className="mb-4 text-[18px] leading-[110%] md:leading-[150%] font-medium md:font-normal md:text-[24px]">
            {data?.[14]?.word}
          </div>

          <h4 className="font-semibold mb-2 md:leading-[150%] leading-[140%] text-[20px] md:text-[24px]">
            {data?.[15]?.word}
          </h4>

          <h5 className="md:text-[18px] text-[16px] font-medium -tracking-wide leading-[145%] mb-6">
            {data?.[16]?.word}
          </h5>

          <div className="text-[16px] font-medium leading-[150%] mb-4">
            <CustomField
              disabled={step !== 3 || !!accessToken}
              className="w-full mt-2 mb-8"
              label={data?.[17]?.word}
              control={form.control}
              placeholder={data?.[18]?.word}
              type="text"
              error={errors.password}
              name="password"
            />
          </div>

          <div className="text-[16px] font-medium leading-[150%]">
            <CustomField
              disabled={step !== 3}
              className=" w-full mt-2 mb-8"
              label={data?.[19]?.word}
              control={form.control}
              placeholder={data?.[20]?.word}
              type="text"
              error={errors.password_confirmation}
              name="password_confirmation"
            />

            <Button
              type="submit"
              disabled={step !== 3 || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? <LoadingDots /> : data?.[21]?.word}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
