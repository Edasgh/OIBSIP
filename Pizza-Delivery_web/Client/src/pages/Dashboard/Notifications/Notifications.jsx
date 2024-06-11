import React, { useEffect, useState } from 'react';
import "./Notifications.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { product_types } from '../../../data';
import { fetchProducts } from '../../../redux/slices/productSlice';

const token = localStorage.getItem("token");

const Notifications = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const { data: user, sts } = useSelector((state) => state.user);

    const {data:products,productsBelow20,status}=useSelector((state)=>state.product);


    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            if (user.isAdmin == false) {
                navigate("/");
            }else{
                dispatch(fetchProducts());
            }
        }
    })
    return (
        <>
            {token && (
                <>
                    {user.isAdmin == true ? (
                        <>
                            {productsBelow20 && productsBelow20.length!==0 ? (
                                <>
                                {productsBelow20.map((product)=>(
                                   <div style={{display:"flex",gap:".7rem",justifyContent:"flex-start",alignItems:"center",flexWrap:"wrap"}} key={product._id}>
                                   <p  style={{color:"var(--text-colora)"}}> <span className='poppins-semibold'> {product.name} ({product_types[product.product_type]})</span> :<span style={{color:"var(--color-primary)"}} className='poppins-medium'> Quantity is below 20 (Quantity : {product.quantity})</span></p>
                                   <button type="button" className='poppins-semibold update-qty' onClick={()=>{navigate(`/profile_dashboard/${product._id}/edit_product?quantity=true`)}}>Add Product</button>
                                   </div>
                                ))}
                                </>
                            ):(
                                <>
                                </>

                            )}
                        </>
                    ) : (
                        <h1 className='poppins-bold'>404 : NOT FOUND!</h1>
                    )}

                </>
            )}
        </>

    )
}

export default Notifications