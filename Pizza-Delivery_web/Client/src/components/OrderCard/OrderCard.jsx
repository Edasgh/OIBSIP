import React from 'react';
import { useNavigate } from 'react-router-dom';



const OrderCard = () => {
  const navigate=useNavigate();
  return (
    <div className="profile-content" style={{width:"80%",margin:"0 auto"}}>
      {/* <span className="poppins-semibold user" style={{fontSize:"1.5rem"}}>Ordered By : Piya Dolui (userId:898iuioweropu)</span> */}
      {/* <br /> */}
      {/* <hr /> */}
      {/* <br /> */}
          <h2 className="poppins-semibold">Items :</h2>
          <br />
        <div className='order-card'>
   
     <div className="item-details"  onClick={()=>{navigate("/product")}}>
        <ul type="none">
            <li><span className='poppins-medium'>Name :</span> <span className="poppins-light">Cheesy Pizza</span></li>
            <li><span className='poppins-medium'>Category :</span> <span className="poppins-light">Veg</span></li>
            <li><span className='poppins-medium'>Variant:</span> <span className="poppins-light">Full (120rs)</span></li>
            <li><span className='poppins-medium'>Quantity :</span> <span className="poppins-light">4</span></li>
            <li><span className='poppins-medium'>Price :</span> <span className="poppins-light">120</span></li>
        </ul>
     </div>
   
     <div className="item-details"  onClick={()=>{navigate("/product")}}>
        <ul type="none">
            <li><span className='poppins-medium'>Name :</span> <span className="poppins-light">Cheesy Pizza</span></li>
            <li><span className='poppins-medium'>Category :</span> <span className="poppins-light">Veg</span></li>
            <li><span className='poppins-medium'>Variant:</span> <span className="poppins-light">Full (120rs)</span></li>
            <li><span className='poppins-medium'>Quantity :</span> <span className="poppins-light">4</span></li>
            <li><span className='poppins-medium'>Price :</span> <span className="poppins-light">120</span></li>
        </ul>
     </div>
   
     <div className="item-details"  onClick={()=>{navigate("/product")}}>
        <ul type="none">
            <li><span className='poppins-medium'>Name :</span> <span className="poppins-light">Cheesy Pizza</span></li>
            <li><span className='poppins-medium'>Category :</span> <span className="poppins-light">Veg</span></li>
            <li><span className='poppins-medium'>Variant:</span> <span className="poppins-light">Full (120rs)</span></li>
            <li><span className='poppins-medium'>Quantity :</span> <span className="poppins-light">4</span></li>
            <li><span className='poppins-medium'>Price :</span> <span className="poppins-light">120</span></li>
        </ul>
     </div>
     <div className="item-details"  onClick={()=>{navigate("/product")}}>
        <ul type="none">
            <li><span className='poppins-medium'>Name :</span> <span className="poppins-light">Cheesy Pizza</span></li>
            <li><span className='poppins-medium'>Category :</span> <span className="poppins-light">Veg</span></li>
            <li><span className='poppins-medium'>Variant:</span> <span className="poppins-light">Full (120rs)</span></li>
            <li><span className='poppins-medium'>Quantity :</span> <span className="poppins-light">4</span></li>
            <li><span className='poppins-medium'>Price :</span> <span className="poppins-light">120</span></li>
        </ul>
     </div>
     <div className="item-details"  onClick={()=>{navigate("/product")}}>
        <ul type="none">
            <li><span className='poppins-medium'>Name :</span> <span className="poppins-light">Cheesy Pizza</span></li>
            <li><span className='poppins-medium'>Category :</span> <span className="poppins-light">Veg</span></li>
            <li><span className='poppins-medium'>Variant:</span> <span className="poppins-light">Full (120rs)</span></li>
            <li><span className='poppins-medium'>Quantity :</span> <span className="poppins-light">4</span></li>
            <li><span className='poppins-medium'>Price :</span> <span className="poppins-light">120</span></li>
        </ul>
     </div>

      
        </div>
        <br />
        <hr />
    <div className="flex-container" style={{margin:"1rem"}}>
    <div className="total-price-div" style={{fontSize:"1.7rem"}} >
      <p className='poppins-medium' style={{color:"var(--text-colora)"}}>Total Price : </p>
      <p className='poppins-medium' style={{color:"var(--color-view)"}}>1440 rs</p>
    </div>
  
      <div className="user-address" style={{width:"12rem",padding:".7rem",border:"1px solid grey"}}>
     <span className='poppins-medium'>Address :</span> 
     <p style={{color:"var(--text-colora)"}}>123dsp colony , gt villa, khidirpur, suvam apartment</p>
     </div>

     <div className="buttons-container order-card-btn-container"  style={{display:"flex",flexDirection:"column"}}>
        {/* <div className="update-status">
          <label htmlFor="order-status">Order Status : </label>
          <select name="order-status" id="order-status"> 
        // here in case we add props, add the order id with the id of select here "order-status-ui9086jk"//
            <option value="Order Placed">Order Placed</option>
            <option value="In the Kitchen">In the Kitchen</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Order Delivered">Order Delivered</option>
          </select>
        </div> */}
      <button className="delete-order poppins-medium" title='Delete order'>Delete Order&nbsp;&nbsp;<i className="fa-solid fa-trash-can bin-icon"></i></button>
        <button className="status poppins-medium" title='Order Placed'>Order Placed on 05-02-24</button>
        <button className="status poppins-medium" title='Order Delivered'>Order Delivered on 06-02-24</button>
      </div>
     </div>
    </div>
  )
}

export default OrderCard;