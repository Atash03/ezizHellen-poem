import { cn } from '@/lib/utils';

const SectionLine = ({ className }: { className?: string }) => {
  return (
    <div className={cn('w-full h-[1px] relative bg-OUTLINE_VAR', className)}>
      <img
        src="/images/romb.svg"
        alt=""
        className="absolute -top-[3.5px] left-1/2 -translate-x-1/2"
      />
    </div>
  );
};

export default SectionLine;
