import { useState } from "react";
import { Poem } from "@/services/types/poems.type";

interface SortType {
  id: string;
  view: string;
}

interface ReturnProps {
  sort: SortType;
  searchValue: string;
  currentPage: number;

  filterData: Poem[] | undefined;
  setSort: (obj: SortType) => void;
  setCurrentPage: (num: number) => void;
  setSearchValue: (value: string) => void;
  getSortData: () => Poem[] | undefined;
}

export const getSortPoems = (
  poems: Poem[] | undefined,
  perPage: number
): ReturnProps => {
  const [sort, setSort] = useState({
    id: "new",
    view: "Ilki täze goşgular",
  });
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filterData = poems?.filter((item) =>
    item.poem_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedData = filterData?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const sortData = displayedData && [...displayedData].reverse();

  const getSortData = () => (sort.id === "old" ? displayedData : sortData);

  return {
    sort,
    setSort,
    filterData,
    getSortData,
    searchValue,
    currentPage,
    setSearchValue,
    setCurrentPage,
  };
};
