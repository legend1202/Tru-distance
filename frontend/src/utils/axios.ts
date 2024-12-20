import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

if (sessionStorage.getItem('accessToken')) {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('accessToken');
}

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { params: { ...config } });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  admin: {
    userList: '/api/auth/get-users',
    userRoleUpdate: '/api/auth/assign-role',
  },
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    loginwithMS: '/api/auth/login_ms',
    register: '/api/auth/register',
  },
  upload: {
    boe: '/api/upload/boe',
    cbom: '/api/upload/cbom',
    travel: '/api/upload/travel',
    sow: '/api/upload/sow',
    gra: '/api/upload/gra',
  },
  wbs_mng: {
    wbs_lists: '/api/wbs/wbslists',
  },
  gantt: {
    details: '/api/gantt/details',
  },
  clin: {
    getData: '/api/clin/getClin',
  },
  boe: {
    getData: '/api/boe/boeLists',
    getFilelist: '/api/boe/filelist',
    filedelete: '/api/boe/filedelete',
  },
  approve_workflow: {
    task_assign: '/api/approve/task_assign',
    get_assigned_tasks: '/api/approve/get_assigned_tasks',
    get_proposal_list: '/api/proposal/getlist',
    update_proposal_list: '/api/proposal/updatelist',
  },
  evaluation: {
    getTotalTaskDataByProposalId: '/api/evaluation/getTotalTaskDataByProposalId',
    getFlowdata: '/api/evaluation/getFlowdata',
    updateFlowdata: '/api/evaluation/updateFlowdata',
    updateTaskStatus: '/api/evaluation/updateTaskStatus',
  },
};
