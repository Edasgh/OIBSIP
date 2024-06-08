import React, { useEffect, useState } from 'react';
import CartCard from '../../../components/CartCard/CartCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../../redux/slices/productSlice';
import { fetchCartItems } from '../../../redux/slices/cartSlice';

const token = localStorage.getItem("token");


const Cart = () => {
   const {data:products,totalPrice,status}=useSelector((state)=>state.cart);
  
   const dispatch=useDispatch();
    const navigate = useNavigate();

 


    useEffect(() => {
      if (!token) {
        navigate("/login");
      }else{
        dispatch(fetchCartItems());
      }
    }, []);

 


    if (status === STATUSES.LOADING) {
      return <h2>Loading....</h2>;
    }
  
    if (status === STATUSES.ERROR) {
      return <h2>Something went wrong!</h2>;
    }




  return (
  <>
   <div className="profile-header-content">
    <h2 className="poppins-semibold dashboard-section-title">My Cart (Total {products.length} Item(s) : total price = {totalPrice} rs)</h2>
  </div>
  
   {/* props : name,category,variant,quantity,price,removeFromCart */}
   {products && products.map((product)=>(
    <CartCard 
    key={product._id}
    product={product}
    link={`/${product.productId}/product`}
     />
   ))}
   {(!products||products.length==0)&&(
    <p className="poppins-medium" style={{color:"var(--text-colora)",fontSize:"1.4rem"}}>No items : Add a Product to Cart</p>
   )}
    <ul type="none" className='buttons-container'>
      {(products.length!==0) && <button className="place-order poppins-semibold">Place Order</button> }
    
  </ul>

  </>
  )
}

export default Cart