import { useMediaQuery } from "usehooks-ts";
import TextRomb from "./text-romb";
import { cn } from "@/lib/utils";
import { useGetAbout } from "@/query/use-get-about";

const RombsBlock = () => {
  const desktop = useMediaQuery("(min-width: 1280px)");

  const { data } = useGetAbout();

  const info = data?.[0]?.my_lifestyle || [];

  return (
    <>
      <div className="md:hidden xl:flex flex xl:flex-row flex-col xl:gap-6 items-center relative">
        <div className="flex justify-start w-full xl:w-fit">
          <TextRomb text={info?.[0]?.name} />
        </div>
        <img
          src={`/images/about/arrow${desktop ? "" : "-right"}.svg`}
          alt=""
          className="absolute xl:top-0 top-10 xl:left-[13.5%] left-[165px]"
        />
        <div className="flex justify-end w-full xl:w-fit -mt-4">
          <TextRomb text={info[1]?.name} />
        </div>

        <img
          src={`/images/about/arrow${desktop ? "-bottom" : "-right"}.svg`}
          alt=""
          className="absolute xl:bottom-0 bottom-[340px] xl:left-[34%] left-1/2"
        />
        <div className="flex justify-start w-full xl:w-fit -mt-4">
          <TextRomb text={info[2]?.name} />
        </div>

        <img
          src={`/images/about/arrow${!desktop ? "-left" : "-bottom"}.svg`}
          alt=""
          className={cn(
            "absolute xl:bottom-0 bottom-[185px] xl:right-[15%] right-[150px]"
          )}
        />

        <div className="flex justify-end w-full xl:w-fit -mt-4">
          <TextRomb text={info[3]?.name} />
        </div>

        <img
          src={`/images/about/arrow${!desktop ? "-left" : ""}.svg`}
          alt=""
          className="absolute xl:top-0 top-[210px] xl:right-[35%] right-[147px]"
        />
        <div className="flex justify-start w-full xl:w-fit -mt-4">
          <TextRomb text={info[4]?.name} />
        </div>
      </div>

      <div className="xl:hidden hidden md:block relative container h-[300px]">
        <img
          src="/images/about/medium-arrow-bottom.svg"
          className="absolute top-4 left-[130px]"
        />
        <TextRomb text={info?.[0]?.name} className="absolute top-0 left-0" />

        <TextRomb
          text={info[1]?.name}
          className="absolute bottom-0 left-[155px]"
        />
        <img
          src="/images/about/medium-arrow-top.svg"
          className="absolute bottom-4 left-[275px]"
        />

        <TextRomb
          text={info[2]?.name}
          className="absolute top-0 left-1/2 -translate-x-1/2"
        />
        <img
          src="/images/about/medium-arrow-bottom.svg"
          className="absolute top-4 right-[240px]"
        />

        <TextRomb
          text={info[3]?.name}
          className="absolute bottom-0 right-[155px]"
        />
        <img
          src="/images/about/medium-arrow-top.svg"
          className="absolute bottom-4 right-[86px]"
        />

        <TextRomb text={info[4]?.name} className="absolute top-0 right-0" />
      </div>
    </>
  );
};

export default RombsBlock;
