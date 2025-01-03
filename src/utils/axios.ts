import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export const baseURL = `${CONFIG.serverUrl}/api/`;

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: 'chat',
  kanban: 'kanban',
  calendar: 'calendar',
  auth: {
    me: 'auth/me',
    signIn: 'User/login',
    signUp: 'User/register',
  },
  companies: {
    list: 'companys',
    delete: (id: string) => `companys?company_id=${id}`,
    create: (name: string) => `companys?company_name=${name}`,
    edit: (id: string, name: string) => `companys?company_id=${id}&company_name=${name}`,
    stats: 'Stat/companys',
  },
  device: {
    list: 'device/devices',
    delete: (id: string) => `device/device?device_id=${id}`,
    create: 'device/device',
    edit: (id: string) => `device/device?device_id=${id}`,
  },
  camera: 'cameras',
};
