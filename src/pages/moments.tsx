import PageLayout from "@/components/layout/page-layout";
import MomentsCard from "@/components/shared/moments-card";
import Pagination from "@/components/shared/pagination";
import { scrollTop } from "@/lib/utils";
import { useGetMoments } from "@/query/use-get-moments";
import { useGetStatic } from "@/query/use-get-static-words";
import { useState } from "react";

const Moments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  scrollTop(currentPage);

  const { data: staticData } = useGetStatic(7, "momentsData");
  const { data: moments } = useGetMoments();

  const displayedData = moments?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <PageLayout
      title={staticData?.[0]?.word}
      className="xl:gap-12 gap-8"
      text={staticData?.[1]?.word}
    >
      <div className="relative ">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-6 mb-8">
          {displayedData?.map((item, i) => (
            <MomentsCard image={item?.main_image?.path} key={i} {...item} />
          ))}
        </div>

        {displayedData && displayedData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={moments?.length || 1}
            perPage={perPage}
            onChangePage={setCurrentPage}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Moments;
