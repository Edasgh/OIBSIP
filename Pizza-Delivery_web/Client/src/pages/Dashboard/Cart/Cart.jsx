import React, { useEffect } from 'react';
import CartCard from '../../CartCard/CartCard';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem("token");


const Cart = () => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, []);
  return (
  <>
   <div className="profile-header-content">
    <h2 className="poppins-semibold dashboard-section-title">My Cart (Total 5 Items : 1200rs)</h2>
  </div>
  
    <CartCard/>
    <CartCard/>
    <CartCard/>
    <CartCard/>
    <CartCard/>
    <ul type="none" className='buttons-container'>
    <button className="place-order poppins-semibold">Place Order</button>
  </ul>

  </>
  )
}

export default Cart