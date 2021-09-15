import base64 from "base-64";
import { create } from "apisauce";
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  API_PASSWORD,
  API_USER_NAME,
  ERROR_SOMETHING_WENT_WRONG
} from "../constants";

const api = create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    api_email: "salman.khimani@cubixlabs.com",
    api_password: "apipass123"
    // Authorization: `Basic ${base64.encode(`${API_USER_NAME}:${API_PASSWORD}`)}`
  },
  timeout: API_TIMEOUT
});

class ApiSauce {
  async post(url, data, headers) {
    const response = await api.post(url, data, headers);

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }
}

export default new ApiSauce();
