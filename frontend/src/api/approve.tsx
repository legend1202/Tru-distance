import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import {} from 'src/types/gantt';
import { ITask } from 'src/types/task';

const options = {
  revalidateOnFocus: true,
  revalidateOnMount: true,
};

export const TaskAssignApprove = async (query: ITask[]) => {
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
      approvedData: data?.result?.apprvedData as ITask[],
      approvedDataLoading: isLoading,
      approvedDataError: error,
      approvedDataValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
};
