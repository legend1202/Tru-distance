import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

import { IFilelist } from 'src/types/upload';

// const options = {
//   revalidateOnFocus: true,
//   revalidateOnMount: true,
// };

export function useGetFileLists() {
  const URL = endpoints.boe.getFilelist;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      fileList: (data?.result?.filelist as IFilelist[]) || [],
      fileLoading: isLoading,
      fileError: error,
      fileValidating: isValidating,
    }),
    [data?.result, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export const DeleteFile = async (fileId: string) => {
  const res = await axiosInstance.post(endpoints.boe.filedelete, {
    fileId,
  });

  const memoizedValue = {
    data: res?.data.result.deletedFile as IFilelist,
  };

  return memoizedValue;
};
