import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IBoe } from 'src/types/boe';

export function useGetBoeLists() {
  const URL = endpoints.boe.getData;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      boeList: (data?.result?.boe as IBoe[]) || [],
      boeLoading: isLoading,
      boeError: error,
      boeValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}
