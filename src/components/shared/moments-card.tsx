import { Link } from "react-router-dom";
import { BgTexture } from "./bg-texture";
import { cn } from "@/lib/utils";

type Props = {
  image: string;
  moment_name: string;
  textureNone?: boolean;
  className?: string;
  id: number | undefined;
};

const MomentsCard = ({
  moment_name,
  image,
  className,
  textureNone = false,
  id,
}: Props) => {
  return (
    <Link to={`/moments/${id}`}>
      <article
        className={cn(
          "flex flex-col gap-4 xl:w-[378px] md:w-[372px] w-[328px] relative group cursor-pointer",
          !textureNone
            ? "shadow-bottom md:py-8 md:px-6 p-4 h-[289px]"
            : "h-[253px]",
          className
        )}
      >
        {!textureNone && (
          <BgTexture className="xl:bg-[url('/images/moments/card-shape.svg')] md:bg-[url('/images/moments/moments-med-shape.svg')] bg-[url('/images/moments/moments-mob-shape.svg')] moments-mob-path xl:moments-card-path md:moments-med-path" />
        )}
        <div
          className={cn(
            "relative w-full after:size-full after:absolute after:z-10 transition-all group-hover:after:bg-transparent after:bg-[#7A590C]/15 after:transition-all",
            textureNone ? "h-[209px]" : "h-[209px] xl:h-[181px]"
          )}
        >
          <img
            src="/images/moments/img.svg"
            alt="moments-image"
            className={cn("absolute z-20 top-3 right-3")}
          />

          <img
            src={image || ""}
            alt="moments-icon"
            className="absolute z-10 top-0 left-0 size-full object-cover"
          />
        </div>
        <h4 className="text-[20px] leading-[140%]">{moment_name}</h4>
      </article>
    </Link>
  );
};

export default MomentsCard;
