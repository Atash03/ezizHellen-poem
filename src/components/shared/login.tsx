import { cn } from '@/lib/utils';
import { useRef } from 'react';
import LoginForm from '../forms/login-form';
import { useLoginStore } from '@/store/useLogin';
import { X } from 'lucide-react';
import { BgTexture } from './bg-texture';
import { Dialog, DialogContent } from '../ui/dialog';

const Login = () => {
  const ref = useRef<HTMLDivElement>(null);

  const setActive = useLoginStore().setActive;
  const active = useLoginStore((state) => state.active);

  return (
    <Dialog open={active} onOpenChange={() => setActive(!active)}>
      <DialogContent>
        <div
          ref={ref}
          className="absolute md:py-[52px] py-8 w-[328px] md:w-[408px] h-[456px] md:px-6 px-4 top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
          <BgTexture className={cn("bg-[url('/images/login-shape.svg')] login-path")} />
          <X
            onClick={() => setActive(false)}
            className="absolute md:block hidden top-3 right-3 p-1 cursor-pointer"
            size={30}
          />

          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
