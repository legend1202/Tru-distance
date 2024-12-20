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

export const uploadCbomExcel = async (query: IPdfType) => {
  const formData = new FormData();

  query.forEach((pdf) => {
    formData.append('cbom', pdf);
  });

  const res = await axiosInstance.post(endpoints.upload.cbom, formData);

  return `${HOST_API}/${res.data?.result?.boeFiles[0]}`;
};

export const uploadTravelAny = async (query: IPdfType) => {
  const formData = new FormData();

  query.forEach((pdf) => {
    formData.append('travel', pdf);
  });

  const res = await axiosInstance.post(endpoints.upload.travel, formData);

  return `${HOST_API}/${res.data?.result?.boeFiles[0]}`;
};

export const uploadSow = async (query: IPdfType) => {
  const formData = new FormData();

  query.forEach((pdf) => {
    formData.append('sow', pdf);
  });

  const res = await axiosInstance.post(endpoints.upload.sow, formData);

  return `${HOST_API}/${res.data?.result?.boeFiles[0]}`;
};

export const uploadGra = async (query: IPdfType) => {
  const formData = new FormData();

  query.forEach((pdf) => {
    formData.append('gra', pdf);
  });

  const res = await axiosInstance.post(endpoints.upload.gra, formData);

  return `${HOST_API}/${res.data?.result?.boeFiles[0]}`;
};
