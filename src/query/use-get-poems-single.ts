import poetService from "@/services/poet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetPoemsSingle = (id: number | undefined) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["poemsSingle", id],
    queryFn: () => poetService.getPoemsSingle(id),
    select: ({ data }) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
