import axios from "axios";
import HttpError from "../exceptions/HttpError";
import TokenHandler from "./token-handler";
import router from "@/router";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PATH,
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.get["Accept"] = "application/json";

axiosInstance.interceptors.response.use(undefined, async (res) => {
  const originalRequest = res.config;

  if (res.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = TokenHandler.getRefreshToken();

      if (!refreshToken) {
        TokenHandler.removeRefreshToken()
        TokenHandler.removeToken()
        router.push('login');

        return Promise.reject(res);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_PATH}/refresh_token`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        }
      );

      const { token: newToken, refresh_token: newRefreshToken } = response.data;
      TokenHandler.storeToken(newToken);
      if (newRefreshToken) {
        TokenHandler.storeRefreshToken(newRefreshToken);
      }
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);

    } catch (refreshError) {
      TokenHandler.removeRefreshToken()
      TokenHandler.removeToken()
      router.push('login');

      return Promise.reject(refreshError);
    }
  }
  switch (res.response?.status) {
    case 400:
      {

        if (res.response.data.errors)
          throw new HttpError(
            (
              Object.values(res.response.data.errors).flatMap(
                (e) => e
              ) as string[]
            ).join(" "),
            400
          );
        if (res.response.data.message) {
          if (res.response.data.message[0]) {
            const validations = []
            res.response.data.message.forEach(user => {
              user.validation.forEach(error => {
                validations.push({ field: error.property, record: user.index, type: Object.keys(error.constraints)[0] })
              }
              )
            })
            console.log(validations)
            throw new HttpError(res.response.data.message, 400, validations);

          }
          else
            throw new HttpError(res.response.data.message, 400);
        }

      }
      break;

    case 403: {
      // useAuthStore().setAuth('')
      // useAuthStore().setPermissions('')
      // useAuthStore().setRefresh('')
      // useAuthStore().setClientStorage(null)
      // useAuthStore().setRequestLoanStorage('1')

      // router.push('/')
      throw new HttpError("No está autorizado", 403);
    }
    case 404:
      throw new HttpError("No se ha encontrado el recurso", 404);
    case 409:
      throw new HttpError("related_element", 409);
    case 429:
      throw new HttpError(
        "Demasiadas peticiones, espere un momento para intentarlo nuevamente",
        429
      );
    case 500: {
      throw new HttpError(res.response.data.message, 500);
    }

    default:
      break;
  }
});
