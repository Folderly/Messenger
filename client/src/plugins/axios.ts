import { Constants } from "@/constants/constants";
import router from "@/router";
import { useStore } from "@/store";
import axiosOriginal, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosOptions: AxiosRequestConfig = {
  baseURL: Constants.ApiUrl,
  withCredentials: true,
};

const axios: AxiosInstance = axiosOriginal.create(axiosOptions);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const store = useStore();

    if (error.response.status === 401) {
      await store.signOut();
      router.push("/sign-in");
    } else {
      return Promise.reject(error);
    }
  }
);

export { axios };
