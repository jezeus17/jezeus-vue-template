import axios, { AxiosHeaders, type AxiosRequestConfig } from "axios";
import { ref } from "vue";
import TokenHandler from "../site/token-handler";



export function useSendRequest(
  immediate = false,
  url?: string,
  data?: object,
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
  cb = () => { }
) {
  const result = ref();
  const loading = ref<boolean>(false);
  const error = ref(false);
  const status = ref()

  function sendRequest(
    url: string,
    data?: object,

    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
    cb = () => { },
    token: string | null = TokenHandler.getToken(),
  ) {

    const config: AxiosRequestConfig = {
      headers: new AxiosHeaders(),
      method,
      url: `${import.meta.env.VITE_API_PATH}/${url}`,
    }

    if (token) {
      if (config.headers) config.headers.Authorization = `Bearer ${token}`;
    }

    if (data && method === 'GET')
      config.params = data
    else
      config.data = data;
    axios(config)
      .then(res => {
        result.value = res.data
        error.value = false

      })
      .catch(e => {
        error.value = true
        status.value = e.status
      })
      .finally(async () => {
        /*if(error.value && TokenHandler.getRefreshToken())
            await refreshToken();
        */
        loading.value = false;

        cb();
      });

    loading.value = true;

  }

  if (immediate)
    sendRequest(url as string, data, method, cb);

  return {
    result, loading, error, sendRequest, status
  };
}
