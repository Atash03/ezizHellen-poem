import PageLayout from "@/components/layout/page-layout";
import MomentsCard from "@/components/shared/moments-card";

import { cn, scrollTop } from "@/lib/utils";
import { usePathStore } from "@/store/usePathname";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BgTexture } from "@/components/shared";
import { useGetMomentsSingle } from "@/query/use-get-moments-single";
import { useGetMoments } from "@/query/use-get-moments";

const MomentsSingle = () => {
  const setPath = usePathStore((state) => state.setPath);

  const { id } = useParams();
  const { data } = useGetMomentsSingle(String(id));
  const { data: moments } = useGetMoments();

  scrollTop(id);

  useEffect(() => {
    setPath("moment");

    return () => setPath("");
  }, []);

  return (
    <PageLayout title={"Pursatlarag"} className="gap-8">
      <div className="relative w-full xl:h-[504px] md:h-[436px] md:shadow-bottom py-8 md:px-6">
        <BgTexture className="hidden md:block xl:bg-[url('/images/moments/moments-single-shape.svg')] md:bg-[url('/images/moments/main-med-shape.svg')] xl:moments-single-path md:moments-main-med-path" />

        <Link
          to="/moments"
          className="flex items-center gap-1 xl:mb-8 md:mb-6 mb-8"
        >
          <img src="/images/arrow.svg" />
          <h6 className="text-16 !font-normal text-ON_SURFACE_VAR">Yza</h6>
        </Link>

        <div className="flex md:flex-row flex-col xl:gap-6 gap-8">
          <div className="xl:flex-[0_0_675px] md:flex-[0_0_420px] xl:h-[379px] md:h-[235px] md:bg-[#7A590C]/[16%]">
            <img
              src={data?.main_image?.path}
              alt="surat"
              className="size-full object-contain"
            />
          </div>

          <div className="flex flex-col -tracking-wide justify-between">
            <div>
              <h4 className="text-[24px] md:text-[20px] xl:text-[24px] leading-[140%] -tracking-wide font-semibold xl:mb-4 md:mb-2 mb-4">
                {data?.moment_name}
              </h4>
              <p className="xl:text-16 md:text-[14px] md:leading-[145%] text-16 !font-normal md:mb-2 mb-4">
                {data?.moment_text}
              </p>
            </div>

            <h6 className="text-ON_SURFACE_VAR text-[14px] font-semibold leading-[140%]">
              {/* 01.09.2024 */}
            </h6>
          </div>
        </div>
      </div>

      <img src="/images/divider.svg" className="w-full md:hidden" />

      <div className="relative md:block hidden shadow-bottom xl:h-[317px] py-8 px-6">
        <BgTexture className="md:block hidden xl:bg-[url('/images/moments/moments-single-shape-2.svg')] md:bg-[url('/images/moments/moments-2-med-shape.svg')] xl:moments-single-2-path moments-2-med-path" />
        <Carousel className="md:block hidden">
          <CarouselContent innerClassName="overflow-hidden">
            {moments?.map((item, i) => (
              <CarouselItem
                className={cn(
                  "xl:basis-[372px] md:basis-[352px] !h-[253px] mr-[18px]"
                )}
                key={i}
              >
                <Link to={`/moments/${item.id}`}>
                  <MomentsCard
                    image={item?.main_image?.path}
                    {...item}
                    textureNone
                    id={item.id}
                    moment_name={data?.moment_name || ""}
                    className="md:!w-full"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hover:opacity-100 hidden xl:flex" />
          <CarouselPrevious className="hover:opacity-100 hidden xl:flex" />
        </Carousel>
      </div>

      <div className="md:hidden flex flex-col gap-[44px]">
        <div className="flex xl:hidden flex-col gap-4">
          {moments
            ?.filter((item) => item.id !== Number(id))
            ?.map((item, i) => (
              <MomentsCard
                image={item?.main_image?.path}
                {...item}
                id={item.id}
                key={i}
                textureNone
                className="!p-0"
              />
            ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MomentsSingle;
