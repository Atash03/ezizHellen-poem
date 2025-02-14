import PageLayout from "@/components/layout/page-layout";
import RegisterForm from "@/components/forms/register-form";
import { BgTexture } from "@/components/shared";
import { useGetStatic } from "@/query/use-get-static-words";

const Register = () => {
  const { data } = useGetStatic(13, "registerData");

  return (
    <PageLayout
      title={data?.[0]?.word}
      className="gap-12"
      text={data?.[1]?.word}
    >
      <section className="text-center relative shadow-bottom h-[1490px] xl:h-[1340px] md:h-[1388px] xl:w-[1200px] px-4 xl:px-0 py-8">
        <BgTexture className='xl:bg-[url("/images/faq/register-shape1.svg")] md:bg-[url("/images/faq/register-med-shape.svg")] bg-[url("/images/faq/register-mob-shape.svg")] xl:register-path md:register-med-path register-mob-path' />

        <RegisterForm />
      </section>
    </PageLayout>
  );
};

export default Register;
