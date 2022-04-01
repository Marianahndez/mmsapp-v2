import React from 'react';
import ReactDOM from 'react-dom';
import './globalStyles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome/welcome';
import UserHome from './UserHome/userHome';
import History from './History/history';
import AddService from './AddService/addService';
import RecoverPassword from './Register/recoverPassword';
import RegisterPage from './Register/register';
import Notifications from './Notifications/notifications';
import Profile from './Profile/profile';
import Sucursales from './Sucursales/sucursales';
import ServiceDetails from './ServiceDetails/serviceDetails';
import Transport from './Transport/transport';
import reportWebVitals from './reportWebVitals';
import { UserDataContextProvider } from './context/userData-context.js';

ReactDOM.render(
  <React.StrictMode>
    <UserDataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/newAccount" element={<RegisterPage />} />
          <Route path="/addService" element={<AddService />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/details" element={<ServiceDetails />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/transport" element={<Transport />} />
        </Routes>
      </BrowserRouter>
    </UserDataContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
