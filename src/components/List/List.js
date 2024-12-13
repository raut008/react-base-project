import React from 'react';
import { APP_CONSTANTS } from '../../constants/app-constants';
import { useFetch } from '../../hooks/useFetch';

const List = () => {
  const { data: usersList } = useFetch({
    shouldFetch: true,
    endpoint: `https://dummyjson.com/auth/users`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${APP_CONSTANTS.loginInfo.accessToken}`,
    },
    credentials: 'include',
  });

  const renderUserList = usersList?.users?.map((user, index) => {
    return <h6 key={index}>{user?.firstName}</h6>;
  });

  return (
    <div>
      <h3>List</h3>
      {renderUserList}
    </div>
  );
};

export default List;
