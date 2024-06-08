import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { STATUSES, fetchProducts } from '../../../redux/slices/productSlice';
import { useDispatch, useSelector } from "react-redux";

const token = localStorage.getItem("token");

const View_Products = () => {
  const { data: userDetails } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails.isAdmin == false) {
      navigate("/");
    }
  }, []);

  const { data: products, status } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
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
        <h2 className="poppins-semibold dashboard-section-title">All Products</h2>
      </div>

      {
        products && products.map((product) => (
          <ProductCard key={product._id}
            product={product}
            variants={product.variants}
            extraOptions={product.extraOptions} />
        ))
      }
    </>

  )
}

export default View_Products;