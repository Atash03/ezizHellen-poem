import { Input } from "../ui/input";
import { ActiveSort } from "@/store/useSynlar";
import { DropDown } from "./drop-down";
import { Word } from "@/services/types/static.type";

interface Props {
  searchTitle?: string;
  searchPlace?: string;
  sortTitle?: string;
  search?: string;
  data: Word[];
  setSearch: (str: string) => void;
  sort: ActiveSort;
  setSort: (val: ActiveSort) => void;
  className?: string;
}

const SortModal = ({
  setSearch,
  searchTitle,
  searchPlace,
  sort,
  search,
  setSort,
  sortTitle,
  data = [],
}: Props) => {
  return (
    <div className="relative">
      <div className="flex md:flex-row flex-col md:items-center gap-4 md:gap-6">
        <div className="md:flex-[0_1_79%]">
          <h5 className="mb-2 text-16 !text-ON_SURFACE">{searchTitle}</h5>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={50}
            placeholder={searchPlace}
            className="search h-[52px] !placeholder:text-ON_SURFACE_VAR !text-ON_SURFACE_VAR"
          />
        </div>
        <div className="md:flex-[0_0_240px]">
          <h5 className="mb-2 text-16">{sortTitle}</h5>
          <DropDown
            data={data}
            sort={sort}
            setSort={setSort}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SortModal;
