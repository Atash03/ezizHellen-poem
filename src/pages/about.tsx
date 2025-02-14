import PageLayout from "@/components/layout/page-layout";
import { BorderImg, EllipsisBlock, InfoBlock } from "@/components/shared";
import RombsBlock from "@/components/shared/rombs-block";
import SectionLine from "@/components/shared/section-line";
import { useGetAbout } from "@/query/use-get-about";
import { useGetStatic } from "@/query/use-get-static-words";

const About = () => {
  const { data } = useGetAbout();

  const { data: staticWords } = useGetStatic(2, "aboutData");

  const info = data || [];

  return (
    <PageLayout
      title={info?.[0]?.header}
      text={info?.[0]?.header_text}
      className="xl:gap-12 gap-8 pb-[30px] container"
    >
      <BorderImg
        className="max-w-[616px] max-h-[340px] mx-auto"
        img="/images/about/suprugi.png"
      />

      <SectionLine />

      <section className="flex flex-col gap-6 xl:gap-12">
        <h2 className="h2 kaushan xl:text-center pr-4">
          {staticWords?.[0]?.word}
        </h2>

        <RombsBlock />
      </section>

      <SectionLine />

      <InfoBlock
        title={info?.[0]?.my_childhood_and_school_years_header}
        text={info?.[0]?.my_childhood_and_school_years_text}
        rombs
      />

      <InfoBlock
        title={info?.[0]?.my_student_years_header}
        text={info?.[0]?.my_student_years_text}
        rombs
      />

      <InfoBlock
        title={info?.[0]?.my_medical_period_json?.[0]?.header}
        text={info?.[0]?.my_medical_period_json?.[0]?.text}
        img="/images/about/doctor.png"
        imgClassName="md:w-[286px] size-full md:h-[420px]"
        rombs
      />

      <InfoBlock
        title={info?.[0]?.when_worked_at_the_un_json?.[0].header}
        text={info?.[0]?.when_worked_at_the_un_json?.[0].text}
        arr={info?.[0]?.when_worked_at_the_un_json}
        img="/images/about/portret.png"
        imgClassName="md:w-[286px] md:h-[309px] size-full"
      />

      <SectionLine />

      <section className="flex flex-col overflow-visible">
        <h2 className="h2 kaushan xl:mb-20 mb-6 text-center">
          Ynha meniň geçen durmuş ýolum:
        </h2>

        <EllipsisBlock />
      </section>

      <SectionLine />

      <section className="flex flex-col xl:gap-6 gap-2 text-[16px] leading-[150%] xl:text-[24px] xl:leading-[135%]">
        <div className="flex flex-col xl:gap-6 gap-2">
          <p>{info?.[0]?.footer_text}</p>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
