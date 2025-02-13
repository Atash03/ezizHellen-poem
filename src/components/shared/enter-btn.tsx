import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  setActive: (val: boolean) => void;
  setMode: (str: string) => void;
}

export const EnterBtn = ({ className, setActive, setMode }: Props) => {
  return (
    <button
      onClick={() => {
        setMode("login");
        setActive(true);
      }}
      className={cn(
        "flex gap-2 text-[14px] text-PRIM font-medium justify-center items-center font-inter py-2.5 px-4 border-[1.5px] rounded-[4px] h-10 border-OUTLINE",
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 14V12.6667H12.6667V3.33333H8V2H12.6667C13.0333 2 13.3473 2.13067 13.6087 2.392C13.87 2.65333 14.0004 2.96711 14 3.33333V12.6667C14 13.0333 13.8696 13.3473 13.6087 13.6087C13.3478 13.87 13.0338 14.0004 12.6667 14H8ZM6.66667 11.3333L5.75 10.3667L7.45 8.66667H2V7.33333H7.45L5.75 5.63333L6.66667 4.66667L10 8L6.66667 11.3333Z"
          fill="#7A590C"
        />
      </svg>
      <h6>Giriş</h6>
    </button>
  );
};
