import React, { useEffect } from 'react';
import OrderCard from '../../../components/OrderCard/OrderCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/slices/orderSlice';



const token = localStorage.getItem("token");

const Orders = () => {
  const { data: userDetails } = useSelector((state) => state.user);

  const { data: orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);


  useEffect(() => {
    dispatch(fetchOrders());
  }, [])

  return (
    <>

      <div className="profile-header-content">
        <h2 className="poppins-semibold dashboard-section-title">My Orders</h2>
      </div>
      {(!orders || orders.length==0) && (
        <p className="poppins-medium" style={{color:"var(--text-colora)",fontSize:"1.4rem"}}>No orders : Order a Product</p>
      )}
      {orders && orders.map((order) => (
        <OrderCard key={order._id}
          items={order.items}
          address={order.address}
          isAdmin={userDetails.isAdmin}
          totalPrice={order.totalPrice}
          orderStatus={order.status}
          order={order}
          userId={userDetails._id}
    
        />
      ))}
    </>

  )
}

export default Orders