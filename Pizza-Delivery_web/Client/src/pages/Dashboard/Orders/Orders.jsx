import React, { useEffect } from 'react';
import OrderCard from '../../OrderCard/OrderCard';
import { useNavigate } from 'react-router-dom';


const token = localStorage.getItem("token");

const Orders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
  <>
  
    <div className="profile-header-content">
    <h2 className="poppins-semibold dashboard-section-title">My Orders</h2>
  </div>
  
    <OrderCard/>
  </>

  )
}

export default Orders