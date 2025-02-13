import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel';
import { useMediaQuery } from 'usehooks-ts';
import { useLocation } from 'react-router-dom';

interface Props<T> {
  array: T[];
  setActive: (i: number) => void;
  active: number;
  className?: string;
  renderName: (item: T) => string;
}

const Tabs = <T,>({ array, active, setActive, className, renderName }: Props<T>) => {
  const [api, setApi] = useState<CarouselApi>();
  const ref = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLHeadingElement>(null);
  const desktop = useMediaQuery('(min-width: 768px)');
  const { pathname } = useLocation();

  useEffect(() => {
    if (api) {
      api.scrollTo(active);
    }
  }, [active, api]);

  return desktop || pathname === '/comments' ? (
    <div
      ref={ref}
      className={cn(
        'flex md:text-16 text-[14px] font-medium items-center md:h-10 h-9 border-b transition-all w-fit mx-auto border-OUTLINE',
        className,
      )}>
      {Array.isArray(array) &&
        array.map((item, i) => (
          <h5
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 md:py-2 py-1  cursor-pointer relative transition-all',
              pathname === '/comments' ? '' : '',
            )}>
            <div
              className={cn(
                active === i &&
                  'absolute transition-all duration-200 bottom-0 left-0 h-0.5 w-full bg-OUTLINE_VAR_HIGH',
              )}
            />
            {renderName(item)}
          </h5>
        ))}
    </div>
  ) : (
    <div className="border-OUTLINE w-auto border-b">
      <Carousel setApi={setApi} opts={{ align: 'start' }}>
        <CarouselContent
          className={cn(
            'flex md:text-16 text-[14px]  font-medium items-center md:h-10 h-9 mx-auto ',
            className,
          )}>
          {array.map((item, i) => (
            <CarouselItem key={i} className={cn(`basis-[${itemRef.current?.clientWidth}px]`)}>
              <h5
                ref={itemRef}
                onClick={() => setActive(i)}
                className={cn('px-4 md:py-2 py-1 w-fit cursor-pointer relative transition-all')}>
                <div
                  className={cn(
                    active === i &&
                      'absolute transition-all duration-200 bottom-0 left-0 h-0.5 w-full bg-OUTLINE_VAR_HIGH',
                  )}
                />
                {renderName(item)}
              </h5>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Tabs;
