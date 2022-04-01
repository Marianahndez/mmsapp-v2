import React, { useState } from 'react';

export const UserData = () => {
  const [user, setUser] = useState({
    address: '',
    address2: '',
    email: '',
    id: '',
    mortuary_name: '',
    name: '',
    password: '',
    postal_code: '',
    rfc: '',
    role: '',
  });

  const addUserData = (data) => {
    setUser(data);
  };

  return { user, addUserData };
};
