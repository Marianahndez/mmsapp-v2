/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useCallback } from 'react';
import { grey, blueGrey } from '@mui/material/colors';
import { Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, getTokenFn, onMessageListener } from '../firebase.js';
import { userDataService } from '../service/userData.js';
import SidebarMenu from '../Menu/menu.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './notifications.scss';

function ToasterNotification({ setOpenToast, openToast }) {
  const { t } = useTranslation();

  const { userDataServObj, getUser, setUserToken, getMyNotifications, userNotifList } =
    userDataService();

  const [notification, setNotification] = useState(undefined);

  const displayMsg = () => {
    if (notification !== undefined) {
      console.log('toaster: ', notification);
      toast.success(<div><h3>{userNotifList[0].title}</h3> <p>{userNotifList[0].body}</p></div>);
    }
  };

  //   onMessageListener().then((payload) => {
  //     setNotification({ title: payload.notification.title, body: payload.notification.body });
  //     setOpenToast(true);
  //     console.log(payload);
  //   }).catch((err) => console.log('failed: ', err));

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (notification !== {}) {
      displayMsg();
    }
  }, [notification]);

  useEffect(() => {
    if (userDataServObj.role === 'Admin') {
      getMyNotifications('Admin');
    } else {
      getMyNotifications(userDataServObj.id);
    }
  }, [userDataServObj]);

  useEffect(() => {
    if (userNotifList.length > 0) {
      const res = userNotifList.filter((item) => item.show === undefined);
      console.log('showing... ', res);
      setNotification(res[0]);
    }
  }, [userNotifList]);

  const handleClose = () => {
    const data = {
      ...userNotifList[0],
      show: false,
    };
    updateDoc(doc(db, 'notifications', userNotifList[0].id), data);
  };

  return (
    <ToastContainer
      position="top-right"
      autoClose={7000}
      hideProgressBar={false}
      newestOnTop={false}
      onClick={handleClose}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={1}
    />
  );
}
export default ToasterNotification;
