import { scrollTop } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

const Home = () => {
  scrollTop();

  const tab = useMediaQuery("(min-width: 768px)");

  return (
    <main className="xl:container flex justify-center">
      <section className="xl:w-[812px] relative xl:h-[691px] my-6 md:my-8 ">
        <img
          src="/images/home-banner.png"
          alt="surat"
          className="size-full hidden xl:block shadow-bottom object-cover"
        />

        <div className="xl:hidden md:w-[630px] w-[350px] h-[529px] relative flex justify-center md:h-[596px]">
          <img
            src={!tab ? "/images/home/body.png" : "/images/home/body-med.png"}
            className="absolute top-0 left-0 size-full object-cover"
          />

          <div className="px-8 md:px-14 w-full pb-20 md:pt-16 pt-12 flex flex-col relative z-20 md:gap-6 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="kaushan text-PRIM text-[18px] md:text-[24px] leading-[130%]">
                Hormatly, şygyrýetiň muşdagy! <br /> Meniň Internet sahypama hoş
                geldiňiz!
              </h3>
              <p className="text-[12px] md:text-[14px] font-medium md:font-normal leading-[130%] md:leading-[145%] -tracking-wide">
                Men Siz bilen göni aragatnaşykda boljakdygyma gaty begenýärin.
                Siziň pikirňizi, maslahatlarňyzy hem-de belliklerňizi öz
                döredijiligimde ulanyp biljekdigme çäksiz buýsanýaryn. <br />{" "}
                Bizden daşlaşmaň! Biziň sahypamyza ýazylmagy unutmaň! <br /> Uly
                hormat bilen,
              </p>
              <h4 className="text-right grypen text-[32px] md:text-[40px] leading-[130%]">
                Ezizgeldi Helleňow
              </h4>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="kaushan text-PRIM text-[18px] md:text-[24px] leading-[130%]">
                “Saňa onki süňňüm bilen siňsedim”, <br /> Diýýän seň öňüňde dyz
                epip, Şygyr! <br /> Dury bulak bolup, kalba eňsediň, <br />{" "}
                Ýaşasadym senden bagt tapyp, Şygyr!
              </h3>
              <h5 className="text-[12px] md:text-[14px] text-right font-medium md:font-normal leading-[130%] md:leading-[145%] -tracking-wide">
                Ezizgeldi Helleňow, “Baý göwnüm” kitaby, Aşgabat 2024 ý,
                “Şygyrýet” atly goşgydan, 42-nji sahypa
              </h5>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
