/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable object-curly-newline */
import { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

export const servicesData = () => {
  const [statusCall, setStatusCall] = useState(false);

  const addServiceHandler = async (data) => {
    try {
      console.log('data to post: ', data);
      await addDoc(collection(db, 'services'), data);
      setStatusCall(true);
    } catch (error) {
      setStatusCall(false);
      console.log('err post: ', error);
    }
  };

  const updateServiceHandler = async (data, edit, id) => {
    try {
      updateDoc(doc(db, 'services', id), {
        ...edit,
        ...data,
      });
      setStatusCall(true);
    } catch (error) {
      setStatusCall(false);
      console.log('err post: ', error);
    }
  };

  const updateServicePropHandler = async (data, id) => {
    try {
      updateDoc(doc(db, 'services', id), data);
      setStatusCall(true);
      console.log('data= ', statusCall);
    } catch (error) {
      setStatusCall(false);
      console.log('err post: ', error);
    }
  };

  return {
    addServiceHandler,
    updateServiceHandler,
    updateServicePropHandler,
    statusCall,
  };
};
