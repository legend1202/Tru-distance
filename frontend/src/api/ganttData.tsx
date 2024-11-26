import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { IGanttData } from 'src/types/gantt';

export function useGetGanttData() {
  const URL = endpoints.gantt.details;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      ganttData: data?.result?.ganttData as IGanttData || {},
      ganttLoading: isLoading,
      ganttError: error,
      ganttValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}
