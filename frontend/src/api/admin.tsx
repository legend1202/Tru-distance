import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IUserItem, IUserRoleUpdate } from 'src/types/user';

export function useGetUserLists() {
  const URL = endpoints.admin.userList;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      users: (data?.result.users as IUserItem[]) || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export const UserRoleUpdate = async (query: IUserRoleUpdate) => {
  const res = await axiosInstance.put(endpoints.admin.userRoleUpdate, {
    user: query,
  });

  const memoizedValue = {
    data: res?.data || [],
  };

  return memoizedValue;
};
