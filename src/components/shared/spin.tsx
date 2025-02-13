import { cn } from '@/lib/utils';

export const Spin = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className, 'w-full flex h-[1080px] justify-center')}>
      <div className="size-20 border-4 mx-auto border-PRIM mt-[200px] border-t-transparent rounded-full animate-spin duration-700" />
    </div>
  );
};
