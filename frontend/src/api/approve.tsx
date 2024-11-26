import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IEvaluationData } from 'src/types/gantt';

const options = {
  revalidateOnFocus: true,
  revalidateOnMount: true,
};

export const TaskAssignApprove = async (query: IEvaluationData[]) => {
  const res = await axiosInstance.post(endpoints.approve_workflow.task_assign, {
    approveData: query,
  });

  const memoizedValue = {
    data: res?.data || [],
  };

  return memoizedValue;
};

export const useGetApprovedTaskByWbsId = (wbsId: string) => {
  const URL = [endpoints.approve_workflow.get_assigned_tasks, { wbsId }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  return useMemo(
    () => ({
      approvedData: data?.result?.apprvedData as IEvaluationData[],
      approvedDataLoading: isLoading,
      approvedDataError: error,
      approvedDataValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
};
