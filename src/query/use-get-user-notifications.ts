import poetService from '@/services/poet.service';
import { useQuery } from '@tanstack/react-query';

export const useGetUserNotifications = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['userNotifications'],
    queryFn: () => poetService.getUserNotifications(),
    select: (data) => data.notifications,
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
