import React from 'react';
import toppingImg from "../../assets/veg-toppings.jpg";
import { useNavigate } from 'react-router-dom';

const CartCard = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-content" style={{width:"90%",margin:"0 auto"}}>
        <div className='cart-card'>

     <img src={toppingImg} alt="cart-p" className='cart-img' style={{cursor:"pointer"}} onClick={()=>{navigate("/product")}}/>
     <div className="item-details">
        <ul type="none" className='poppins-light'>
            <li>Name : Cheesy Pizza</li>
            <li>Category : Veg</li>
            <li>Variant: Full (120rs)</li>
            <li>Quantity : 4</li>
            <li>Price : 120</li>
        </ul>
     </div>
      <div className="buttons-container">
        <button className="remove poppins-medium" title='remove from cart'>Remove From Cart&nbsp;&nbsp;<i className="fa-solid fa-trash-can bin-icon"></i></button>
      </div>
        </div>
    </div>
  )
}

export default CartCard