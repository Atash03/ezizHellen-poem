import poetService from "@/services/poet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetPoems = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["poems"],
    queryFn: () => poetService.getPoems(),
    select: ({ data }) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
