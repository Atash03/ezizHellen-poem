import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { PoemType } from '../shared/poems-item';
import { Spin } from '../shared';
interface Props {
  className?: string;
  title?: string;
  text?: string;
  star?: 'active' | 'none' | '';
  messagesText?: string;
  setFavorite?: (item: PoemType) => void;
  children: ReactNode;
  audio?: boolean;
  loading?: boolean;
  onStar?: () => void;
}

const PageLayout = ({
  className,
  title,
  children,
  text,
  audio,
  messagesText,
  star = '',
  loading = false,
  onStar,
}: Props) => {
  return (
    <div className={cn('pt-8 xl:pt-12 pb-16 xl:pb-[120px] min-h-full relative z-30')}>
      <div className="container">
        {!loading ? (
          <>
            <div className="flex justify-center items-start gap-4">
              <h1 className="h1 kaushan text-center xl:mb-12 mb-6">{title}</h1>

              <div className="flex gap-1">
                {star && (
                  <img
                    className="cursor-pointer p-1"
                    src={
                      star === 'none'
                        ? '/images/star.svg'
                        : star === 'active'
                        ? '/images/star-fill.svg'
                        : 'none'
                    }
                    onClick={onStar}
                  />
                )}
                {audio && <img src="/images/play.svg" />}
              </div>
            </div>

            <div className={cn('flex flex-col xl:gap-12 gap-8')}>
              {text && (
                <div>
                  {messagesText && (
                    <p className="text-center xl:text-[24px] md:text-[18px] text-[16px] xl:leading-[135%] leading-[150%] text-ON_SURFACE_VAR mx-auto xl:w-[1000px]">
                      {messagesText}
                    </p>
                  )}
                  <p className="text-center xl:text-[24px] md:text-[18px] text-[16px] xl:leading-[135%] leading-[150%] text-ON_SURFACE_VAR mx-auto xl:w-[1000px]">
                    {text}
                  </p>
                </div>
              )}
              <section className={cn('flex flex-col', className)}>{children}</section>
            </div>
          </>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default PageLayout;
