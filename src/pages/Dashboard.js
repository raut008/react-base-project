import React, { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { APP_CONSTANTS } from '../constants/app-constants';
import { clearAllCookies } from '../utils/authUtils';
import Card from '../components/Card/Card';

const Dashboard = () => {
  const [pageIndex] = useState(0);

  const { data: userDetails, erorr: userError } = useFetch({
    shouldFetch: true,
    endpoint: 'https://dummyjson.com/auth/me',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${APP_CONSTANTS.loginInfo.accessToken}`,
    },
    credentials: 'include',
  });

  const handleLogout = () => {
    localStorage.clear();
    clearAllCookies();
    window.location.href = window.location.origin;
  };

  const productListUrl = `https://dummyjson.com/auth/products?limit=10&skip=${pageIndex * 10}&select=title,price,thumbnail`;

  const { data: productList } = useFetch({
    shouldFetch: true,
    endpoint: productListUrl,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${APP_CONSTANTS.loginInfo.accessToken}`,
    },
    credentials: 'include',
  });

  const renderProductList = productList?.products?.map((product, index) => {
    return <Card key={index} product={product} />;
  });

  if (userError) return <div>Error loading data</div>;

  return (
    <div>
      {userDetails && (
        <div>
          USERNAME: {userDetails.username}
          <button onClick={() => handleLogout()}>LOGOUT</button>
        </div>
      )}
      {productList ? (
        <div>
          <h6>Product List</h6>
          {renderProductList}
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
