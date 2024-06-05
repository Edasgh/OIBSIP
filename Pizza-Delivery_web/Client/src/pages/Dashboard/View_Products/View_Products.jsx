import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../ProductCard/ProductCard';


const token = localStorage.getItem("token");

const View_Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
  <>
  
    <div className="profile-header-content">
    <h2 className="poppins-semibold dashboard-section-title">All Products</h2>
  </div>
  
   <ProductCard/>
  </>

  )
}

export default View_Products;