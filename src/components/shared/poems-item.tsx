import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { BgTexture } from "./bg-texture";
import { ToastAction } from "../ui/toast";
import poetService from "@/services/poet.service";
import { useGetPinPoems } from "@/query/use-get-pin-poems";
import { useState } from "react";
import { useGetStatic } from "@/query/use-get-static-words";
import { AudioFile } from "@/services/types/poems.type";

export interface PoemType {
  id: number;
  poem_name: string;
  audio_file?: AudioFile;

  title: string;
  isNew: number;
}

interface Props extends PoemType {
  link: string;

  title: string;
  active?: boolean;
  onFavoriteChange?: (id: number, isPinned: boolean) => void;
}

const PoemsItem = ({
  id,
  poem_name,
  link,
  title,
  isNew,
  audio_file,
}: Props) => {
  const token = useAuthStore((state) => state.accessToken);
  const [loading, setLoading] = useState(false);

  console.log(audio_file?.path);

  const { data: staticData } = useGetStatic(3, "poemsData");

  const { data: pinned, refetch } = useGetPinPoems(token ? token : "");
  const isPinnedBack = pinned?.pinned_poems.some((item) => item.id === id);
  const handlePin = async () => {
    try {
      await poetService.postPoem({ poem_id: id });
      await refetch();
    } catch (error) {
      console.log("Ошибка при закреплении:", error);
    }
  };

  const handleUnpin = async () => {
    try {
      await poetService.unPinPoem({ poem_id: id });
      await refetch();
    } catch (error) {
      console.log("Ошибка при откреплении:", error);
    }
  };

  const onStar = async () => {
    try {
      setLoading(true);
      const { toast } = await import("@/hooks/use-toast");

      if (isPinnedBack) {
        await handleUnpin();
        toast({
          title: staticData?.[1]?.word,
          action: (
            <ToastAction onClick={handlePin} altText="Отмена">
              {staticData?.[2]?.word}
            </ToastAction>
          ),
        });
      } else {
        await handlePin();
        toast({
          title: staticData?.[0]?.word,
          action: (
            <ToastAction onClick={handleUnpin} altText="Отмена">
              {staticData?.[2]?.word}
            </ToastAction>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при изменении закрепления:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div className="xl:w-[458px] md:w-[372px] xl:h-[134px] h-[118px] w-[328px] p-4 xl:p-6 relative shadow-bottom cursor-pointer">
      <BgTexture className="xl:bg-[url('/images/poems/poem-shape.svg')] md:bg-[url('/images/poems/poem-med-shape.svg')] bg-[url('/images/poems/poem-mob-shape.svg')] poem-mob-path md:poems-med-path xl:poem-path" />

      <Link
        to={link}
        className="leading-[120%] flex items-start mb-2 h-[58px] overflow-hidden"
      >
        <div className="flex items-center w-full">
          <img src="/images/romb.svg" className="mr-1" />
          <div className="flex justify-between w-full">
            <h4 className="kaushan mr-3">{poem_name}</h4>
            {audio_file?.path && <img src="/images/play.svg" alt="play" />}
          </div>
        </div>
      </Link>

      <div className="leading-[115%] h-5 flex items-center gap-2">
        {token && (
          <button
            disabled={loading}
            onClick={() => onStar()}
            className="w-5 disabled:opacity-50"
          >
            <img
              src={isPinnedBack ? "/images/star-fill.svg" : "/images/star.svg"}
              className="mr-1 size-5"
            />
          </button>
        )}
        {Boolean(isNew) && (
          <img src="/images/poems/new.svg" alt="" className="mr-1" />
        )}

        <span className="font-medium italic text-[14px]">{title}</span>
      </div>
    </motion.div>
  );
};

export default PoemsItem;
