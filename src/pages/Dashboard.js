import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { APP_CONSTANTS } from '../constants/app-constants';
import { clearAllCookies } from '../utils/authUtils';
import Card from '../components/Card/Card';
import List from '../components/List/List';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    pageIndex: 0,
    showUserList: false,
  });

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

  const productListUrl = `https://dummyjson.com/auth/products?limit=10&skip=${dashboard.pageIndex * 10}&select=title,price,thumbnail`;

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboard((prev) => {
        return {
          ...prev,
          showUserList: true,
        };
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [productList]);

  if (userError) return <div>Error loading data</div>;
  return (
    <div>
      {userDetails && (
        <div>
          USERNAME: {userDetails.username}
          <button onClick={() => handleLogout()}>LOGOUT</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: '32px' }}>
        {productList ? (
          <div>
            <h3>Product List</h3>
            {renderProductList}
          </div>
        ) : null}
        {dashboard.showUserList ? <List /> : null}
      </div>
    </div>
  );
};

export default Dashboard;
