import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { ITotalTaskDataByEvaluator } from 'src/types/evaluation';

const options = {
  revalidateOnFocus: true,
  revalidateOnMount: true,
};

export const useGetEvaluationDataByEvaluator = (proposalId: string) => {
  const URL = [endpoints.evaluation.getTotalTaskDataByProposalId, { proposalId }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      dataList: (data?.result?.apprvedData as ITotalTaskDataByEvaluator[]) || [],
      dataLoading: isLoading,
      dataError: error,
      dataValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

