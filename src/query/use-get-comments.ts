import poetService from '@/services/poet.service';
import { useQuery } from '@tanstack/react-query';

export const useGetComments = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['messages'],
    queryFn: () => poetService.getComments(),
    select: (data) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
