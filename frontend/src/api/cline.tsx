import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IClin } from 'src/types/clin';

export function useGetClinLists() {
  const URL = endpoints.clin.getData;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      clinList: (data?.result?.clins as IClin[]) || [],
      clinLoading: isLoading,
      clinError: error,
      clinValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}
