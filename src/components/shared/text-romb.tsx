import { cn } from "@/lib/utils";

interface Props {
  text: string;
  ellips?: boolean;
  className?: string;
}

const TextRomb = ({ text, className, ellips = false }: Props) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center bg-no-repeat bg-cover relative",
        className,
        ellips
          ? "xl:w-[384px] xl:py-0 py-10 xl:h-[164px] w-[296px] h-[126px] bg-[url('/images/about/owal.png')] font-normal text-[20px] shadow-bottom"
          : "xl:size-[216px] size-[172px] bg-[url('/images/about/decor-romb.png')] font-medium shadow-bottom xl:drop-shadow-none"
      )}
    >
      <h4
        className={cn(
          "xl:px-8 px-6 -tracking-wider !leading-[130%] xl:!leading-[140%] font-medium text-center",
          ellips ? "xl:text-[20px] text-[18px]" : "xl:text-[14px] text-[12px]"
        )}
      >
        {text}
      </h4>
      {/* <img
        src={
          ellips
            ? "/images/about/inner-ellips.png"
            : "/images/about/inner-romb.png"
        }
        className="absolute top-2 -z-10"
      /> */}
    </div>
  );
};

export default TextRomb;
