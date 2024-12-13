import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { APP_CONSTANTS } from '../constants/app-constants';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useFetch({
    shouldFetch,
    endpoint: 'https://dummyjson.com/auth/login',
    method: 'POST',
    body: JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: APP_CONSTANTS.refreshTokenExpiryTime,
    }),
    credentials: 'include',
  });

  useEffect(() => {
    if (data) {
      APP_CONSTANTS.loginInfo = { ...data };
      localStorage.setItem(
        APP_CONSTANTS.localStorageLoginInfoKey,
        JSON.stringify(data)
      );
      navigate('/dashboard');
    }
  }, [data, navigate]);

  const handleSignIn = () => {
    setShouldFetch((prev) => !prev);
  };

  return <button onClick={() => handleSignIn()}>SIGN IN</button>;
};

export default Login;
