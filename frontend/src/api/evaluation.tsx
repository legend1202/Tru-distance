import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IflowData } from 'src/types/flowData';
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

export const useGetFlowDataByTask = (wbsId: string, taskId: string, subTaskIndex: number) => {
  const URL = [endpoints.evaluation.getFlowdata, { wbsId, taskId, subTaskIndex }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      taskFlowData: data?.result?.flowData as IflowData,
      dataLoading: isLoading,
      dataError: error,
      dataValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
};

export const UpdateFlowData = async (query: IflowData) => {
  const res = await axiosInstance.post(endpoints.evaluation.updateFlowdata, {
    flowData: query,
  });

  const memoizedValue = {
    data: (res?.data?.result.apprvedData as IflowData) || [],
  };

  return memoizedValue;
};

export const UpdateTaskStatus = async (
  wbsId: string,
  taskId: string,
  subTaskIndex: number,
  taskStatus: number
) => {
  const res = await axiosInstance.post(endpoints.evaluation.updateTaskStatus, {
    wbsId,
    taskId,
    subTaskIndex,
    taskStatus,
  });

  const memoizedValue = {
    data: res?.data,
  };

  return memoizedValue;
};
