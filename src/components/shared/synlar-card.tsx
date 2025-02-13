import { Button } from "../ui/button";
import { BgTexture } from "./bg-texture";
import { motion } from "framer-motion";

type Props = {
  categ: string;
  position_author_review: string;
  review_author: string;
  btnText?: string;
};

const SynlarCard = ({
  position_author_review,
  categ,
  review_author,
  btnText,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="md:px-6 relative p-4 md:py-8 syn-hover flex flex-col gap-6 group shadow-bottom after:syn-mob-path md:after:syn-med-path xl:after:comments-1-path xl:w-[384px] xl:h-[378px] md:w-[372px] md:h-[372px] w-[328px] h-[334px]"
    >
      <BgTexture className='xl:bg-[url("/images/comments/1-shape.svg")] md:bg-[url("/images/comments/syn-med-shape.svg")] bg-[url("/images/comments/syn-mob-shape.svg")] syn-mob-path md:syn-med-path xl:comments-1-path' />
      <div>
        <h5 className="kaushan text-[18px] mb-4 text-ON_SURFACE_VAR">
          {categ}
        </h5>
        <p className="group-hover:text-PRIM h-[100px] line-clamp-3">
          {position_author_review}
        </p>
      </div>

      <hr className="text-OUTLINE_VAR" />

      <div className="flex flex-col justify-between h-full">
        <div className="text-[14px] leading-[140%] h-5 xl:mb-9">
          <h5 className="font-semibold uppercase mb-2">{review_author}</h5>
          {/* <h6 className="text-ON_SURFACE_VAR font-medium italic">{print}</h6> */}
        </div>
        <Button>{btnText}</Button>
      </div>
    </motion.div>
  );
};

export default SynlarCard;
