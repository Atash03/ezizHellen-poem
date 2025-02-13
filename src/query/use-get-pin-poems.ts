import poetService from "@/services/poet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetPinPoems = (token: string) => {
  const { data, isLoading, isError, isSuccess, isRefetching, refetch } =
    useQuery({
      queryKey: ["pinPoems"],
      queryFn: () => poetService.getPinPoems(),
      select: (data) => data,
      enabled: token ? true : false,
    });
  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isRefetching,
    refetch,
  };
};
