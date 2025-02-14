import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type Props = {
  link: string;
  text?: string;
  className?: string;
};

const DownloadLink = ({ link, className, text = "Kitap ýükle" }: Props) => {
  const token = localStorage.getItem("accessToken");

  return (
    <button
      onClick={() =>
        token
          ? window.open(link, "_blank")
          : toast({
              title: "Ilki bilen giriş et",
              style: {
                backgroundColor: "red",
              },
            })
      }
      className={cn(
        "flex items-center gap-1 py-1 px-2 w-fit hover:bg-[#7A590C]/25 rounded-[4px] transition-all text-[16px] font-semibold leading-[150%] text-PRIM cursor-pointer",
        className
      )}
    >
      <h5>{text}</h5>
      <ArrowUpRight size={18} />
    </button>
  );
};

export default DownloadLink;
