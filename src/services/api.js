import { APP_CONSTANTS } from '../constants/app-constants';

let isRefreshingToken = false;
let refreshTokenPromise = null;

export const fetcher = async ({
  endpoint,
  method = 'GET',
  body = null,
  credentials = null,
  headers,
}) => {
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const options = {
    method,
    headers: requestHeaders,
  };

  if (body) {
    options.body = body;
  }

  if (credentials) {
    options.credentials = credentials;
  }

  try {
    const response = await fetch(endpoint, options);

    if (!response.ok && response.status === 401) {
      // Handle 401: Unauthorized
      if (!isRefreshingToken) {
        // Start token refresh process
        isRefreshingToken = true;
        refreshTokenPromise = refreshAccessToken();
      }

      try {
        const { accessToken, refreshToken } = await refreshTokenPromise;
        isRefreshingToken = false;
        refreshTokenPromise = null;

        if (accessToken && refreshToken) {
          APP_CONSTANTS.loginInfo.accessToken = accessToken;
          APP_CONSTANTS.loginInfo.refreshToken = refreshToken;
          localStorage.setItem(
            APP_CONSTANTS.localStorageLoginInfoKey,
            JSON.stringify(APP_CONSTANTS.loginInfo)
          );

          // Retry the failed request with the new token
          options.headers.Authorization = `Bearer ${APP_CONSTANTS.loginInfo.accessToken}`;
          const retryResponse = await fetch(endpoint, options);
          if (!retryResponse.ok) {
            throw new Error('Retry API failed');
          }
          return await retryResponse.json();
        }
      } catch (e) {
        isRefreshingToken = false;
        refreshTokenPromise = null;
        throw new Error('Failed to refresh token');
      }
    } else if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Handle successful response
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'An error occurred');
  }
};

async function refreshAccessToken() {
  const response = await fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: APP_CONSTANTS.loginInfo.refreshToken,
      expiresInMins: APP_CONSTANTS.refreshTokenExpiryTime,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return await response.json();
}
