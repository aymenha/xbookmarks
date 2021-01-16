import axios, { AxiosInstance } from "axios";

interface HttpService {
  get: AxiosInstance["get"];
}

export const httpService: HttpService = {
  get: axios.get,
};
