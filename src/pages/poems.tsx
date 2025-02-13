import { cn, scrollTop } from "@/lib/utils";
import { useGetPoems } from "@/query/use-get-poems";
import { useQueryClient } from "@tanstack/react-query";
import { getSortPoems } from "@/lib/get-sort-data-poems";
import { useGetStatic } from "@/query/use-get-static-words";
import { useGetPinPoems } from "@/query/use-get-pin-poems";

import poetService from "@/services/poet.service";
import SortModal from "@/components/shared/sort-modal";
import PoemsItem from "@/components/shared/poems-item";
import Pagination from "@/components/shared/pagination";
import PageLayout from "@/components/layout/page-layout";
import { useAuthStore } from "@/store/useAuthStore";

const Poems = () => {
  const token = useAuthStore((state) => state.accessToken);
  const { data: poems } = useGetPoems();
  const { data: staticData } = useGetStatic(3, "poemsData");

  const { data: pinned } = useGetPinPoems(token ?? "");
  const pinPoems = pinned?.pinned_poems || [];

  const perPage = 10;

  scrollTop();

  const {
    sort,
    setSort,
    filterData,
    searchValue,
    getSortData,
    currentPage,
    setCurrentPage,
    setSearchValue,
  } = getSortPoems(poems, perPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const queryClient = useQueryClient();

  const handleFavoriteChange = async (poemId: number, isPinned: boolean) => {
    try {
      if (isPinned) {
        await poetService.unPinPoem({ poem_id: poemId });
      } else {
        await poetService.postPoem({ poem_id: poemId });
      }

      queryClient.invalidateQueries({ queryKey: ["pinPoems"] });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageLayout
      title={staticData?.[8]?.word}
      text={staticData?.[9]?.word}
      className="xl:gap-[64px] gap-8"
    >
      <SortModal
        searchTitle={staticData?.[3]?.word}
        searchPlace={staticData?.[7]?.word}
        sortTitle={staticData?.[4]?.word}
        data={staticData?.slice(5, 7) || []}
        search={searchValue}
        setSearch={setSearchValue}
        sort={sort}
        setSort={setSort}
      />

      <div className="flex flex-col gap-8 relative">
        {searchValue.length > 0 && filterData && (
          <div
            className={cn(
              "w-full mx-auto text-[18px]  xl:text-[24px] text-center pb-4 h-[50px]",
              filterData.length !== 0 && "border-b border-OUTLINE"
            )}
          >
            {filterData.length > 0 ? `«${searchValue}»` : "Tapylmady!"}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-8 gap-6 md:w-[768px] xl:w-[948px] mx-auto">
          {getSortData()?.map((item, i) => (
            <PoemsItem
              isNew={item.new}
              key={i}
              link={`/poems/${item.id}`}
              active={pinPoems.some((obj) => obj.id === item.id)}
              onFavoriteChange={handleFavoriteChange}
              {...item}
            />
          ))}
        </div>

        {poems && poems.length > 10 && (
          <Pagination
            perPage={perPage}
            currentPage={currentPage}
            totalPages={poems?.length || 1}
            onChangePage={handlePageChange}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Poems;
