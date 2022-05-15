import axios, { AxiosError, AxiosResponse } from "axios";
import { Router } from "react-router-dom";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = "https://localhost:5001/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }

          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        history.push({
          pathname: "/server-error",
          state: { error: data },
        });
        break;
      case 404:
        toast.error(data.title);
        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, model: {}) => axios.get(url, model).then(responseBody),
  put: (url: string, model: {}) => axios.get(url, model).then(responseBody),
  delete: (url: string) => axios.get(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("bad-request"),
  get401Error: () => requests.get("un-auth"),
  get404Error: () => requests.get("not-found"),
  get500Error: () => requests.get("server-error"),
  getValidationError: () => requests.get("validation-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default agent;
