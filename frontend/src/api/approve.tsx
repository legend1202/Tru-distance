import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IApproveTask } from 'src/types/task';

const options = {
  revalidateOnFocus: true,
  revalidateOnMount: true,
};

export const TaskAssignApprove = async (query: IApproveTask) => {
  const res = await axiosInstance.post(endpoints.approve_workflow.task_assign, {
    approveData: query,
  });

  const memoizedValue = {
    data: res?.data || [],
  };

  return memoizedValue;
};

export const GetApprovedTaskByuserId_WbsId = (wbsId: string, userId: string) => {
  const URL = [endpoints.approve_workflow.get_assigned_tasks, { wbsId, userId }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      approvedData: data?.result?.apprvedData as IApproveTask,
      approvedDataLoading: isLoading,
      approvedDataError: error,
      approvedDataValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};
