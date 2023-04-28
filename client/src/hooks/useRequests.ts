import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getRequests, profileRequest } from '../api/profile';
import { TRequest } from '../types/Request';

function useRequests() {
  const [requests, setRequests] = useState<TRequest[]>([]);

  const { isLoading, isError, data, error } = useQuery<TRequest[], Error>({
    queryKey: ['requests'],
    queryFn: () => getRequests(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setRequests(data);
    }
  }, [data]);

  const requestMutation = useMutation({
    mutationFn: ([reqID, status]: [string, 'accept' | 'reject']) => {
      return profileRequest(reqID, status);
    },
    onSuccess(successData, [id, status]) {
      const updatedRequests = requests.filter((r) => r._id !== id);
      setRequests(updatedRequests);
    },
  });

  return {
    requests,
    isLoading,
    isError,
    error,
    requestMutation: {
      isLoading: requestMutation.isLoading,
      isError: requestMutation.isError,
      error: requestMutation.error,
      mutate: (reqID: string, status: 'accept' | 'reject') =>
        requestMutation.mutate([reqID, status]),
    },
  };
}

export default useRequests;
