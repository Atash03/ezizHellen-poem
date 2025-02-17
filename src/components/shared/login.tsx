import { cn } from "@/lib/utils";
import { useRef } from "react";
import LoginForm from "../forms/login-form";
import { useLoginStore } from "@/store/useLogin";
import { X } from "lucide-react";
import { BgTexture } from "./bg-texture";
import { Dialog, DialogContent } from "../ui/dialog";
import ForgotPasswordForm from "../forms/forgotPassword-from";
import EditPasswordForm from "../forms/editPassword-form";
import clsx from "clsx";

const Login = () => {
  const ref = useRef<HTMLDivElement>(null);

  const setActive = useLoginStore().setActive;
  const active = useLoginStore((state) => state.active);
  const status = useLoginStore((state) => state.status);
  const setStatus = useLoginStore((state) => state.setStatus);

  return (
    <Dialog
      open={active}
      onOpenChange={() => {
        setActive(!active);
        setStatus("initial");
      }}
    >
      <DialogContent>
        <div
          ref={ref}
          className={clsx("absolute md:py-[52px] py-8 w-[328px] md:w-[408px] h-[456px] md:px-6 px-4 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2")}
        >
          <BgTexture
            className={cn("bg-[url('/images/login-shape.svg')] login-path")}
          />
          <X
            onClick={() => {
              setActive(false);
              setStatus("initial");
            }}
            className="absolute md:block hidden top-3 right-3 p-1 cursor-pointer z-50"
            size={30}
          />

          {status === "initial" ? (
            <LoginForm />
          ) : status === "forgot" ? (
            <ForgotPasswordForm />
          ) : (
            status === "reset" && <EditPasswordForm />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
