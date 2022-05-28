/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './globalStyles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome/welcome.jsx';
import UserHome from './UserHome/userHome.jsx';
import History from './History/history.jsx';
import AddService from './AddService/addService.jsx';
import RecoverPassword from './Register/recoverPassword.jsx';
import RegisterPage from './Register/register.jsx';
import Notifications from './Notifications/notifications.jsx';
import Profile from './Profile/profile.jsx';
import Sucursales from './Sucursales/sucursales.jsx';
import ServiceDetails from './ServiceDetails/serviceDetails.jsx';
import UserDetails from './ServiceDetails/userDetails.jsx';
import Transport from './Transport/transport.jsx';
import Tracking from './Tracking/tracking.jsx';
import SearchTracking from './Tracking/searchTracking.jsx';
import reportWebVitals from './reportWebVitals';
import { UserDataContextProvider } from './context/userData-context.js';
import './i18n.js';

ReactDOM.render(
  <React.StrictMode>
    <UserDataContextProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/recoverPassword" element={<RecoverPassword />} />
          <Route path="/newAccount" element={<RegisterPage />} />
          <Route path="/addService/:size" element={<AddService />} />
          <Route path="/userHome" element={<UserHome />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/details/:id" element={<ServiceDetails />} />
          <Route path="/userDetails/:item" element={<UserDetails />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/transport/:id" element={<Transport />} />
          <Route path="/tracking/:id" element={<Tracking />} />
          <Route path="/search-tracking" element={<SearchTracking />} />
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
