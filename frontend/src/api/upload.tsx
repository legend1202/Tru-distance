import axiosInstance, { endpoints } from 'src/utils/axios';

import { HOST_API } from 'src/config-global';

import { IPdfType } from 'src/types/upload';

export const uploadBoePdf = async (query: IPdfType) => {
  const formData = new FormData();

  query.forEach((pdf) => {
    formData.append('boe', pdf);
  });

  const res = await axiosInstance.post(endpoints.upload.boe, formData);

  return `${HOST_API}/${res.data?.result?.boeFiles[0]}`;
};
