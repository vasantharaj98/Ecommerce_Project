import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Dashboard = ({show}) => {

  const { user: currentUser } = useSelector((state) => state.auth);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  
  return (
    <div className='content' style={{marginLeft: show ? '270px' : '30px'}}>Dashboard</div>
  )
}

export default Dashboard