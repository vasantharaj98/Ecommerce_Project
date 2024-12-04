import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearMessage } from '../../slices/message';

export default function Toast (){

    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();
  
    useEffect(() => {
      if (message) {
        toast(message, {
          onClose: () => {
            dispatch(clearMessage());
          },
        });
      }
    }, [message, dispatch]);


  return (
    <div>
      <ToastContainer />
    </div>
  );
}