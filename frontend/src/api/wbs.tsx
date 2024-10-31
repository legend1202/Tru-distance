import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IWbs } from 'src/types/wbs';

export function useGetWBSLists() {
  const URL = endpoints.wbs_mng.wbs_lists;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      wbsList: data?.result?.wbs as IWbs[] || [],
      wbsLoading: isLoading,
      wbsError: error,
      wbsValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}
