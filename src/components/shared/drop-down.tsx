import { cn } from '@/lib/utils';
import { ActiveSort } from '@/store/useSynlar';
import { useEffect, useRef, useState } from 'react';

interface Props {
  className?: string;
  sort: ActiveSort;
  setSort: (val: ActiveSort) => void;
  data: { word: string }[];
}

export const DropDown = ({ className, sort, setSort, data }: Props) => {
  const sortData = [
    {
      id: 'new',
      view: data[0]?.word,
    },
    {
      id: 'old',
      view: data[1]?.word,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setActive(false);
      }
    };

    document.body.addEventListener('click', handleClick);

    return () => document.body.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        onClick={() => setActive(!active)}
        className={cn(
          'p-4 border cursor-pointer border-OUTLINE_VAR hover:border-OUTLINE h-[52px] relative transition-all  rounded-[4px_4px_0_0] flex justify-between items-center text-[14px] font-medium leading-[115%]',
          {
            'bg-PRIM_CONTAINER text-ON_PRIM_CONTAINER border-opacity-0': active,
          },
        )}>
        {sort.view}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(active && 'rotate-180')}>
          <path
            d="M10 12.5L5.83334 8.33337H14.1667L10 12.5Z"
            fill={!active ? '#403626' : '#FFE9C2'}
          />
        </svg>
      </div>

      <div className="relative z-10">
        <div
          className={cn(
            'cursor-pointer transition-all opacity-0 absolute top-0 right-0 left-0',
            active ? 'opacity-100 pointer-events-auto' : 'pointer-events-none',
          )}>
          {sortData
            .filter((item) => item.id !== sort.id)
            .map((item, i) => (
              <div
                onClick={() => {
                  setSort(item);
                  setActive(false);
                }}
                key={i}
                className="input rounded-[0_0_4px_4px] h-[52px] bg-SURFACE_CONTAINER">
                {item.view}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
