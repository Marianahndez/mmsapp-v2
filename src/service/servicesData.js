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
      await addDoc(collection(db, 'services'), data);
      setStatusCall(true);
    } catch (error) {
      setStatusCall(false);
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
    }
  };

  const updateServicePropHandler = async (data, id) => {
    console.log('update: ', id);
    console.log('updated props: ', data);
    try {
      updateDoc(doc(db, 'services', id), data);
      setStatusCall(true);
    } catch (error) {
      setStatusCall(false);
    }
  };

  return {
    addServiceHandler,
    updateServiceHandler,
    updateServicePropHandler,
    statusCall,
  };
};
