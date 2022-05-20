import { Constants } from "@/constants/constants";
import axiosOriginal, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosOptions: AxiosRequestConfig = {
  baseURL: Constants.ApiUrl,
  withCredentials: true,
};

const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

export { axios };
