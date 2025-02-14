import PageLayout from "@/components/layout/page-layout";
import Pagination from "@/components/shared/pagination";
import SortModal from "@/components/shared/sort-modal";
import SynlarCard from "@/components/shared/synlar-card";
import Tabs from "@/components/shared/tabs";
import { cn } from "@/lib/utils";
import { useGetReviews } from "@/query/use-get-reviews";
import { useGetStatic } from "@/query/use-get-static-words";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const tabs = [
  {
    name: "Hemmesi",
    id: 0,
  },
  {
    name: "Synlar",
    id: 1,
  },
  {
    name: "Ýatlamalar",
    id: 2,
  },
  {
    name: "Gutlaglar",
    id: 3,
  },
];

const Synlar = () => {
  const { data: staticWords } = useGetStatic(5, "synlarData");
  const [currentPage, setCurrentPage] = useState(1);

  const [active, setActive] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const perPage = 3;
  const [sort, setSort] = useState({
    id: "new",
    view: "Ilki täzeler",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: reviews } = useGetReviews();

  const filteredData =
    (reviews &&
      reviews.filter(
        (item) =>
          (active === 0 && item) ||
          (active === 1 && item.reviews_category_id === 1) ||
          (active === 2 && item.reviews_category_id === 2) ||
          (active === 3 && item.reviews_category_id === 3)
      )) ??
    [];

  const synlar = searchValue
    ? filteredData.filter(
        (item) =>
          item.position_author_review
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.review_author
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.review_text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filteredData.reverse();

  const sortData = [...filteredData].reverse();

  const getSortData = () => (sort.id === "new" ? synlar : sortData);

  const displayedData = getSortData().slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const getCat = (id: number) =>
    id === 1 ? "Synlar" : id === 2 ? "Ýatlamalar" : "Gutlaglar";

  return (
    <PageLayout title={staticWords?.[0]?.word} text={staticWords?.[1]?.word}>
      <SortModal
        sortTitle={staticWords?.[3]?.word}
        searchTitle={staticWords?.[2]?.word}
        searchPlace={staticWords?.[4]?.word}
        data={staticWords?.slice(5, 7) || []}
        search={searchValue}
        setSearch={setSearchValue}
        sort={sort}
        setSort={setSort}
      />
      <section>
        <div className="relative flex flex-col justify-center transition-all">
          {searchValue ? (
            <div
              className={cn(
                "absolute w-full left-1/2 -translate-x-1/2 xl:top-12 top-6 text-center pb-4 h-[50px]",
                filteredData.length > 0 && "border-b border-OUTLINE"
              )}
            >
              {filteredData && staticWords?.slice(-1)?.[0]?.word}
            </div>
          ) : (
            <Tabs
              renderName={(item) => item.name}
              array={tabs}
              setActive={setActive}
              active={active}
              className="absolute xl:top-12 top-6 left-1/2 -translate-x-1/2"
            />
          )}

          <div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-3 mt-[100px] xl:mt-[140px] gap-6">
            <AnimatePresence>
              {displayedData.map((item, i) => (
                <SynlarCard
                  btnText={staticWords?.slice(-2)?.[0]?.word}
                  categ={getCat(item.reviews_category_id)}
                  key={i}
                  {...item}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {displayedData.length > 0 &&
          displayedData.length < getSortData().length && (
            <Pagination
              className="mt-8"
              currentPage={currentPage}
              totalPages={getSortData().length}
              perPage={perPage}
              onChangePage={handlePageChange}
            />
          )}
      </section>
    </PageLayout>
  );
};

export default Synlar;
