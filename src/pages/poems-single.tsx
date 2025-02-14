import { Spin } from "@/components/shared";
import PoemSwitch from "@/components/shared/poem-switch";
import SectionLine from "@/components/shared/section-line";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { useGetPinPoems } from "@/query/use-get-pin-poems";
import { useGetPoems } from "@/query/use-get-poems";
import { useGetPoemsSingle } from "@/query/use-get-poems-single";
import { useGetStatic } from "@/query/use-get-static-words";
import poetService from "@/services/poet.service";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathStore } from "@/store/usePathname";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PoemsSingle = () => {
  const token = useAuthStore((state) => state.accessToken);
  const { data: staticData } = useGetStatic(3, "poemsData");

  const { id } = useParams();
  const { data, isLoading } = useGetPoemsSingle(Number(id || 1));

  const poemId = Number(id);
  const { data: poems } = useGetPoems();
  const { data: pinned, refetch } = useGetPinPoems(token ?? "");

  const info = data || [];

  const setPath = usePathStore((state) => state.setPath);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPath("poem");

    return () => setPath("");
  }, []);

  const currentIndex =
    poems?.findIndex((poem) => poem.id === poemId) || poemId - 1;

  const prevPoemName = poems?.[currentIndex - 1]?.poem_name;
  const nextPoemName = poems?.[currentIndex + 1]?.poem_name;

  const isPinnedBack = pinned?.pinned_poems.some((item) => item.id === poemId);

  const handlePin = async () => {
    try {
      await poetService.postPoem({ poem_id: Number(id) });
      await refetch();
    } catch (error) {
      console.error("Ошибка при закреплении:", error);
    }
  };

  const handleUnpin = async () => {
    try {
      await poetService.unPinPoem({ poem_id: Number(id) });
      await refetch();
    } catch (error) {
      console.error("Ошибка при откреплении:", error);
    }
  };

  const onStar = async () => {
    try {
      setLoading(true);
      const { toast } = await import("@/hooks/use-toast");

      if (isPinnedBack) {
        await handleUnpin();
        toast({
          title: staticData?.[2]?.word,
          action: (
            <ToastAction onClick={handlePin} altText="Отмена">
              Ýatyrmak
            </ToastAction>
          ),
        });
      } else {
        await handlePin();
        toast({
          title: staticData?.[0]?.word,
          action: (
            <ToastAction onClick={handleUnpin} altText="Отмена">
              Ýatyrmak
            </ToastAction>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при изменении закрепления:", error);
      setLoading(false);
    }
  };

  const poemInfo = info?.[0];

  return (
    <main className={cn("pt-8 xl:pt-12 pb-16 xl:pb-[120px] relative z-30")}>
      <div className="container">
        {!isLoading ? (
          <>
            <div className="flex justify-center items-start gap-4">
              <h1 className="h1 kaushan text-center xl:mb-12 mb-6">
                {poemInfo?.poem_name}
              </h1>

              {token && (
                <div className="flex gap-1">
                  <button
                    disabled={loading}
                    onClick={onStar}
                    className="disabled:opacity-50"
                  >
                    <img
                      className="cursor-pointer p-1"
                      src={
                        !isPinnedBack
                          ? "/images/star.svg"
                          : "/images/star-fill.svg"
                      }
                    />
                  </button>
                </div>
              )}
            </div>

            <div className={cn("flex flex-col xl:gap-12 gap-8")}>
              <section className="container">
                <div className="flex flex-col gap-4 xl:gap-12 md:gap-6 text-[16px] xl:text-[20px] leading-[140%] text-ON_SURFACE_VAR">
                  <p className="md:flex-[0_1_50%]">{poemInfo?.about_poems}</p>
                </div>
              </section>

              {poemInfo?.about_poems && <SectionLine />}

              <section>
                <div className="flex items-center flex-col text-16 gap-4 xl:gap-6 xl:w-[400px] md:w-[372px] !font-normal mx-auto xl:text-[20px]">
                  <div
                    style={{ whiteSpace: "pre-line" }}
                    className="flex flex-col gap-4"
                  >
                    {info?.[0]?.couplets_poem.map((item, i) => (
                      <p key={i}>{item.textarea1}</p>
                    ))}
                  </div>
                  <div className="flex flex-col w-full justify-end items-end text-right xl:w-[140px] text-[14px] leading-[140%] text-ON_SURFACE_VAR xl:font-medium">
                    <h4>{poemInfo?.date_poem}</h4>
                    <h4 className="">{poemInfo?.place_poem}</h4>
                  </div>
                </div>

                {poemInfo?.audio_file && (
                  <div
                    className="container flex justify-center xl:mt-16 mt-8"
                    aria-disabled
                  >
                    <div className="border pt-4 px-4 border-OUTLINE w-fit rounded-[4px]">
                      <h5 className="text-16 font-semibold">
                        {info?.[0]?.poem_name}
                      </h5>
                      <audio
                        id="player"
                        controls
                        src={poemInfo?.audio_file?.path}
                        className="bg-transparent"
                      />
                    </div>
                  </div>
                )}

                <SectionLine className="xl:mt-16 xl:mb-12 my-8" />

                <div className="flex gap-4 md:gap-8 xl:gap-0 items-start xl:justify-between">
                  <PoemSwitch
                    link={
                      poems && poemId !== poems[0].id
                        ? `/poems/${poems?.[currentIndex - 1].id}`
                        : ""
                    }
                    disable={poems ? poemId === poems[0].id : poemId === 1}
                    prev
                    name={prevPoemName ? prevPoemName : ""}
                  />
                  <PoemSwitch
                    link={`/poems/${poems?.[currentIndex + 1]?.id}`}
                    disable={poems && poemId === poems[poems?.length - 1].id}
                    name={nextPoemName ? nextPoemName : ""}
                  />
                </div>
              </section>
            </div>
          </>
        ) : (
          <Spin />
        )}
      </div>
    </main>
  );
};

export default PoemsSingle;
