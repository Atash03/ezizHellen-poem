import poetService from "@/services/poet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetMoments = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["moments"],
    queryFn: () => poetService.getMoments(),
    select: ({ data }) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
