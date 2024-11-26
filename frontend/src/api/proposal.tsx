import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IProposal } from 'src/types/proposal';

export function useGetProposalLists() {
  const URL = endpoints.approve_workflow.get_proposal_list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      proposalList: (data?.result?.proposals as IProposal[]) || [],
      wbsLoading: isLoading,
      wbsError: error,
      wbsValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export const TeamLeadAssignApproveForProposal = async (query: IProposal[]) => {
  const res = await axiosInstance.post(endpoints.approve_workflow.update_proposal_list, {
    approveData: query,
  });

  const memoizedValue = {
    data: res?.data || [],
  };

  return memoizedValue;
};
