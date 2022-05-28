/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase.js';

export const userDataService = () => {
  const [userDataServObj, setUserData] = useState({});
  const [servicesArr, setServicesArr] = useState([]);
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const getUser = async () => {
    try {
      setLoading(true);
      const dataRef = collection(db, 'users');
      const q = query(dataRef, where('email', '==', auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => {
        const userDataObj = {
          id: doc.id,
          ...doc.data(),
        };
        setUserData(userDataObj);
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

  return {
    userDataServObj,
    getUser,
    servicesArr,
    getAllServicesAdmin,
    getServiceDetail,
    service,
    setServicesArr,
    getServiceTracking,
    loading,
  };
};
