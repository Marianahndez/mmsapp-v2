/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import { createContext } from 'react';
import { UserData } from './userData.js';

export const userDataContext = createContext({
  user: {
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
  },
  services: [],
  translate: '',
  addUserData: (e) => {},
  changeL: (e) => {},
  addServicesArray: (e) => {},
});

export const UserDataContextProvider = ({ children }) => {
  const data = UserData();
  return (
    <userDataContext.Provider value={data}>{children}</userDataContext.Provider>
  );
};
