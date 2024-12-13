import { APP_CONSTANTS } from '../constants/app-constants';

export const isUserAuthenticated = () => {
  if (APP_CONSTANTS.loginInfo && Object.keys(APP_CONSTANTS.loginInfo) > 0) {
    return APP_CONSTANTS.loginInfo;
  }

  const data = JSON.parse(
    localStorage.getItem(APP_CONSTANTS.localStorageLoginInfoKey)
  );

  if (data) {
    APP_CONSTANTS.loginInfo = data;
  }
  return data;
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  cookies.forEach((cookie) => {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  });
};
