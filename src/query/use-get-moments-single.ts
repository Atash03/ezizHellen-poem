import poetService from "@/services/poet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMomentsSingle = (id: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["momentsSingle", id],
    queryFn: () => poetService.getMomemntsSingle(id),
    select: ({ data }) => data[0],
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
