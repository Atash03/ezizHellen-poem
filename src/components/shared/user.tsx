import { ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  setBurger?: (value: boolean) => void;
  className?: string;
}

const User = ({ className, setBurger }: Props) => {
  const clearAuthData = useAuthStore((state) => state.clearAuthData);

  const token = useAuthStore((state) => state.accessToken);
  const name = useAuthStore((state) => state.name);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      modal={false}
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DropdownMenuTrigger
        className={cn(
          "px-4 h-10 items-center text-[14px] font-medium  min-w-[60px] gap-4 text-PRIM cursor-pointer flex justify-between border border-OUTLINE rounded-[4px]",
          className
        )}
      >
        {token && name}
        <ChevronUp
          size={16}
          className={cn(isOpen && "rotate-180", "transition-all")}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#ECE1D4] md:w-fit w-[328px] relative z-[70] border-none rounded-[4px]">
        <DropdownMenuItem>
          <Link
            to="/cabinet"
            onClick={() => {
              setIsOpen(false);
              setBurger?.(false);
            }}
            className="py-2 px-4 w-full"
          >
            Kabinet
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={() => {
              clearAuthData();
            }}
            className="py-3 px-4"
          >
            Çykyş
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;
