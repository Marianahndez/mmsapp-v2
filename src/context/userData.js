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
  const [services, setServices] = useState([]);
  const [translate, setTranslate] = useState();

  const addServicesArray = (data) => {
    setServices(data);
  };

  const changeL = (data) => {
    setTranslate(data);
  };

  const addUserData = (data) => {
    setUser(data);
  };

  // eslint-disable-next-line object-curly-newline
  return {
    user,
    services,
    addUserData,
    addServicesArray,
    changeL,
    translate,
  };
};
