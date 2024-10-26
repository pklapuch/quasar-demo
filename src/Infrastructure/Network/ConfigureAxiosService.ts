import axios, { AxiosInstance } from 'axios';

export default function configureAxiosService() {
  function invoke(): AxiosInstance {
    const api = axios.create({ baseURL: process.env.API_BASE_URL });

    // Ensure any response coming from server is passed further down the pipeline (i.e. 4XX, 5XX)
    // instead of axios throwing internal error. Responses can only be evaluated by business logic.
    api.defaults.validateStatus = function () {
      return true;
    };

    return api;
  }

  return {
    invoke,
  };
}
