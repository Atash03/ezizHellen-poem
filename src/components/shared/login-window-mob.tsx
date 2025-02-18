import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useLoginStore } from "@/store/useLogin";
import { motion } from "framer-motion";
import poetService from "@/services/poet.service";
import { BackBtn } from "./back-btn";
import { CustomField } from "./custom-field";
import { useGetStatic } from "@/query/use-get-static-words";
import ForgotPasswordForm from "../forms/forgotPassword-from";
import EditPasswordForm from "../forms/editPassword-form";

const formsSchema = z.object({
  login: z.string().email(""),
  password: z.string(),
});

type FormTypes = z.infer<typeof formsSchema>;

const LoginWindowMob = () => {
  const setMobActive = useLoginStore().setMobActive;
  const setStatus = useLoginStore((state) => state.setStatus);
  const status = useLoginStore((state) => state.status);

  const form = useForm({
    resolver: zodResolver(formsSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: FormTypes) => {
    const body = {
      email: data.login,
      password: data.password,
    };

    try {
      poetService.loginUser(body);
      setMobActive(false);
    } catch (e) {
      console.log(e);
    }
  };

  const { data } = useGetStatic(15, "authData");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed block md:hidden z-[150] top-0 left-0 w-full h-screen py-8 bg-[#EFDEBE] overflow-hidden"
    >
      <img
        src="/images/texture047.png"
        className="size-full absolute top-0 left-0 pointer-events-none object-cover mix-blend-multiply opacity-50"
      />

      {status === "initial" ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6 container">
              <BackBtn setActive={() => setMobActive(false)} />

              <h3 className="text-center font-semibold">{data?.[0]?.word}</h3>

              <div className="flex flex-col gap-6">
                <CustomField
                  control={form.control}
                  name={"login"}
                  label={data?.[1]?.word}
                  placeholder={data?.[2]?.word}
                  error={form.formState.errors.login}
                />
                <CustomField
                  type="password"
                  control={form.control}
                  name={"password"}
                  label={data?.[3]?.word}
                  placeholder={data?.[4]?.word}
                  error={form.formState.errors.password}
                />
              </div>

              <Button type="submit">{data?.[5]?.word}</Button>

              <div className="flex flex-col gap-4 text-center">
                <h5 className="text-16">
                  <Link
                    onClick={() => setMobActive(false)}
                    className="text-TERTIARY tracking-normal hover:underline-offset-4 transition-all hover:underline"
                    to="/instruction"
                  >
                    {data?.[6]?.word}
                  </Link>
                </h5>
                <button
                  onClick={() => setStatus("forgot")}
                  className="text-16 text-TERTIARY tracking-normal hover:underline-offset-4 transition-all hover:underline cursor-pointer"
                >
                  Açar sözi ýatdan çykdy
                </button>
              </div>
            </div>
          </form>
        </Form>
      ) : status === "forgot" ? (
        <ForgotPasswordForm />
      ) : (
        status === "reset" && <EditPasswordForm />
      )}
    </motion.div>
  );
};

export default LoginWindowMob;
