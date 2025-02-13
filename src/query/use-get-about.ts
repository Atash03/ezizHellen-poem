import poetService from "@/services/poet.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAbout = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["about"],
    queryFn: () => poetService.getAbout(),
    select: ({ data }) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
