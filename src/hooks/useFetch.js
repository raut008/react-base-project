import useSWR from 'swr';
import { fetcher } from '../services/api';

const useFetch = ({
  shouldFetch,
  endpoint,
  method,
  swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  },
  headers,
  body,
  credentials,
}) => {
  return useSWR(
    shouldFetch ? endpoint : null,
    () => fetcher({ endpoint, method, body, credentials, headers }),
    swrOptions
  );
};

export { useFetch };
