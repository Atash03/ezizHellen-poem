import poetService from '@/services/poet.service';
import { useQuery } from '@tanstack/react-query';

export const useGetReviews = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => poetService.getReviews(),
    select: ({ data }) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useGetReviewsCategory = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['reviewsCategory'],
    queryFn: () => poetService.getReviewsCategory(),
    select: (data) => data,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
