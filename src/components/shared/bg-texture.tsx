import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  png?: boolean;
};

export const BgTexture = ({ className, png }: Props) => {
  return (
    <div
      className={cn(
        `absolute -z-10 right-0 top-0 bg-no-repeat bg-center bg-cover size-full overflow-hidden`,
        className,
      )}>
      {!png && (
        <img
          src={'/images/texture047.png'}
          className="size-full pointer-events-none scale-150 object-cover mix-blend-multiply opacity-50"
        />
      )}
    </div>
  );
};
