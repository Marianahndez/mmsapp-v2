/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
/* eslint-disable quote-props */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase.js';
import { servicesData } from './servicesData.js';

export const userDataService = () => {
  const [userDataServObj, setUserData] = useState({});
  const [servicesArr, setServicesArr] = useState([]);
  const [adminsIDs, setAdminsIDs] = useState([]);
  const [adminsPhones, setAdminsPhones] = useState([]);
  const [userNotifList, setUserNotifications] = useState([]);
  const [todays, setTodays] = useState([]);
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const { updateServicePropHandler } = servicesData();

  const navigate = useNavigate();

  const getTodaysServices = (arr) => {
    const today = moment().format('MM/DD/YYYY');
    const newArr = arr.filter((i) => i.fecha === today);
    setTodays(newArr);
  };

  const getAllServicesAdmin = async (adminObj) => {
    if (adminObj.role === 'Admin') {
      const servicesRef = collection(db, 'services');
      const q3 = query(servicesRef, orderBy('timestamp', 'desc'));
      const unsub = await onSnapshot(q3, (querySnapshot3) => {
        const servArr = [];
        querySnapshot3.forEach((docx) => {
          const userServices = {
            id: docx.id,
            ...docx.data(),
          };
          servArr.push(userServices);
          setServicesArr(servArr);
        });
      });
    } else {
      const servicesRef = collection(db, 'services');
      const q2 = query(
        servicesRef,
        where('user_id', '==', adminObj.id),
        orderBy('timestamp', 'desc'),
      );
      const unsub = await onSnapshot(q2, (querySnapshot2) => {
        const servArr = [];
        querySnapshot2.forEach((docx) => {
          const userServices = {
            id: docx.id,
            ...docx.data(),
          };
          servArr.push(userServices);
          setServicesArr(servArr);
        });
      });
    }
  };

  const validateExistingUser = async (emailExist) => {
    setLoading(true);
    try {
      const dataRef = collection(db, 'users');
      const q = query(dataRef, where('email', '==', emailExist));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc1) => {
        console.log('found user_', doc1.data());
        setUserExist(true);
      });
    } catch (error) {
      console.log('error user data: ', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setUserExist(false);
      }, 1000);
    }
  };

  const getUser = async () => {
    try {
      setLoading(true);
      const dataRef = collection(db, 'users');
      const q = query(dataRef, where('email', '==', auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc1) => {
        const userDataObj = {
          id: doc1.id,
          ...doc1.data(),
        };
        updateDoc(doc(db, 'users', doc1.id), userDataObj);
        setUserData(userDataObj);
        localStorage.setItem('userLoged', true);
      });
      // console.log('get serv? ', userDataServObj);
    } catch (error) {
      console.log('error user data: ', error);
      navigate('/', { replace: true });
      localStorage.setItem('userLoged', false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const getAdminsIDs = async () => {
    const dataRef = collection(db, 'users');
    const qAdmins = query(dataRef, where('role', '==', 'Admin'));
    const arrTkns = [];

    const querySnapshotAdmins = await getDocs(qAdmins);
    querySnapshotAdmins.docs.map((docAdmins) => {
      arrTkns.push(docAdmins.data().id);
      setAdminsIDs(arrTkns);
    });
  };

  const getAdminsPhones = async () => {
    const dataRef = collection(db, 'users');
    const qAdmins = query(dataRef, where('role', '==', 'Admin'));
    const arrPhones = [];

    const querySnapshotAdmins = await getDocs(qAdmins);
    querySnapshotAdmins.docs.map((docAdmins) => {
      if (docAdmins !== undefined) {
        arrPhones.push(docAdmins.data().email);
        setAdminsPhones(arrPhones);
      }
    });
  };

  // const setUserToken = async (token, id) => {
  //   const usrTkn = {
  //     token_messaging: token,
  //   };
  //   await updateDoc(doc(db, 'users', id), usrTkn);
  // };

  const getServiceDetail = (array, id) => {
    const findService = array.find((i) => i.id === id);
    setService(findService);
  };

  const getServiceTracking = (array, serviceType, params) => {
    switch (serviceType) {
      case 'nip_rastreo':
        const findServiceTrack = array.find((i) => (i.nip_rastreo === params.search));
        return (setService(findServiceTrack), setLoading(true));
      case 'nombre_finado':
        const findServiceTrack2 = array.find((i) => (i.nombre_finado === params.search));
        return (setService(findServiceTrack2), setLoading(true));
      case 'nombre_contacto':
        const findServiceTrack3 = array.find((i) => (i.nombre_contacto === params.search));
        return (setService(findServiceTrack3), setLoading(true));
      case 'origen_destino':
        const findServiceTrack4 = array.find((i) => {
          const origen = i.origen === params.search_origen;
          const destino = i.destino === params.search_destino;
          if (origen && destino) {
            return i;
          }
        });
        return (setService(findServiceTrack4), setLoading(true));

      default:
        break;
    }
  };
  // console.log('get serv 2? ', userDataServObj);

  const sendNotification = async (body) => {
    console.log('notif to send: ', body);
    await addDoc(collection(db, 'notifications'), body);
  };

  // const sendAdminsNotifs = (token, notification) => {
  //   const key = 'AAAA5Ug16ww:APA91bGP64z8M1U6wYI41m41D40klxUTLLyAl9AC-2SA97eF9bmbsTr-KT87mEQI6j5x-yvjKVKWmoPMdBQT5oj52MvyDB7gPVM19M5RuZ_PvBUaK34xWwLjNSZI8Rua-7jRz_YoQZmx';
  //   const to = token;

  //   fetch('https://fcm.googleapis.com/fcm/send', {
  //     'method': 'POST',
  //     'headers': {
  //       'Authorization': 'key=' + key,
  //       'Content-Type': 'application/json',
  //       // 'Access-Control-Allow-Origin': '*',
  //     },
  //     'body': JSON.stringify({
  //       'notification': notification,
  //       'registration_ids': to,
  //     }),
  //   }).then(function (response) {
  //     // const body = {
  //     //   user_id: userDataServObj.id,
  //     //   createdAt: moment().format('LT'),
  //     //   dateCreated: moment().format('L'),
  //     //   ...notification,
  //     // };
  //     // sendNotification(body);

  //     // setNotificationList.push(body);
  //     // console.log(body);
  //     console.log(response);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // };

  const getMyNotifications = async (user) => {
    const notificationsRef = collection(db, 'notifications');
    const qN = query(
      notificationsRef,
      where('for', '==', user),
    );
    const querySnapshotNotifications = await getDocs(qN);
    const arrNots = [];
    querySnapshotNotifications.docs.map((docNotfications) => {
      const notis = {
        id: docNotfications.id,
        ...docNotfications.data(),
      };
      arrNots.push(notis);
      setUserNotifications(arrNots);
    });
  };

  // 'registration_ids': to,
  return {
    userDataServObj,
    getUser,
    servicesArr,
    getAllServicesAdmin,
    getServiceDetail,
    service,
    setServicesArr,
    getServiceTracking,
    userNotifList,
    getMyNotifications,
    sendNotification,
    loading,
    adminsIDs,
    getAdminsIDs,
    getAdminsPhones,
    adminsPhones,
    getTodaysServices,
    todays,
    validateExistingUser,
    userExist,
  };
};
