import poetService from '@/services/poet.service';
import { useQuery } from '@tanstack/react-query';

export const useGetUserComments = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['userComments'],
    queryFn: () => poetService.getUserComments(),
    select: (data) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
