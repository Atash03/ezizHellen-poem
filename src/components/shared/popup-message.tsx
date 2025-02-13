import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { BgTexture } from './bg-texture';
import { Dialog, DialogContent } from '../ui/dialog';

interface Props {
  className?: string;
  active: boolean;
  title?: string;
  text?: string;
  setActive: (value: boolean) => void;
}

const PopupMessage = ({ className, setActive, title, text, active }: Props) => {
  return (
    <Dialog open={active} onOpenChange={() => setActive(!active)}>
      <DialogContent
        className={cn('z-[100] w-[328px] md:w-[408px] md:h-[232px] h-[168px] ', className)}>
        <BgTexture className="md:bg-[url('/images/tost-shape.svg')] bg-[url('/images/tost-mob-shape.svg')] md:tost-path tost-mob-path" />
        <div className="flex flex-col h-full justify-center  md:gap-4 gap-2 text-center">
          <div className="flex flex-col gap-6">
            <h5 className="font-semibold md:text-[24px] text-[20px]">{title}</h5>
            <h6 className="md:text-16 text-[14px] leading-[145%] h-6 -tracking-wide">{text}</h6>
          </div>

          <Button
            type="button"
            onClick={() => setActive(false)}
            className="text-[10px] md:text-[14px]">
            Ýapmak
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupMessage;
