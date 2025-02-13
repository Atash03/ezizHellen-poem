import { cn } from "@/lib/utils";

interface Props {
  className: string;
  imgClassName?: string;
  img: string;
}

export const BorderImg = ({ className, imgClassName, img }: Props) => {
  return (
    <div
      className={cn(
        "relative ring-[0.3px] ring-ON_SURFACE_VAR flex-[1_0_auto]",
        className
      )}
    >
      <img src="/images/romb.svg" alt="" className="absolute -top-1 -left-1" />
      <img
        src="/images/romb.svg"
        alt=""
        className="absolute -top-1 -right-1 "
      />
      <img
        src="/images/romb.svg"
        alt=""
        className="absolute -bottom-1 -left-1"
      />
      <img
        src="/images/romb.svg"
        alt=""
        className="absolute -bottom-1 -right-1"
      />
      <img
        src={img}
        alt=""
        className={cn("object-cover size-full", imgClassName)}
      />
    </div>
  );
};
