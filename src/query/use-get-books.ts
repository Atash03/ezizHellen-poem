import poetService from '@/services/poet.service';
import { useQuery } from '@tanstack/react-query';

export const useGetBooks = () => {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ['books'],
    queryFn: () => poetService.getBooks(),
    select: ({ data }) => data,
  });

  return {
    data,
    isPending,
    isError,
    isSuccess,
  };
};
