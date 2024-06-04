import React, { useState } from "react";
import "./Product.css";
// import { useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/cartReducer";
import crustImg from "../../assets/pexels-polina-tankilevitch-4109128.jpg";
import toppingImg from "../../assets/veg-toppings.jpg";
const Product = () => {
//   const id=useParams().id;
//   const dispatch=useDispatch()
//   const [selectedImg, setSelectedImg] = useState("image1");
  const [quantity, setQuantity] = useState(1);
  
// const {data , loading , error}=useFetch(`products/${id}?populate=*`)
  return (
    <>
      <div className="product">
        <div className="left">
          <div className="mainImg">
            <img src={toppingImg} alt="" />
          </div>
        </div>
        <div className="right">
          <h1 className="title">title</h1>
          <div className="prices">
            <h2 className="oldPrice">$600</h2>
            <h2 className="price">$350</h2>
          </div>
          <p className="description">
          product description
          </p>
          <div className="product-quantity">
            <button
              className="minus"
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="plus"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
            {/* prev is the element or parameter of the setQuantity here */}
          </div>
          <button className="add poppins-semibold" 
        //   onClick={()=>dispatch(addToCart({
        //     id:data.id,
        //     title:data.attributes.title,
        //     description:data.attributes.description,
        //     price:data.attributes.price,
        //     quantity,
        //     image:data.attributes.image1.data.attributes.url,
        //   }))}
          >
            <p className="btn-text">
          ADD TO CART <i className="fa-solid fa-cart-shopping cart-icon"></i> 
            </p>
          </button>
          <div className="option-check">
            
          </div>
          <div className="info">
            <span>Vendor : CHANEL</span>
            <span>Product Type : Sling Bag</span>
            <span>Tag : Sling Bag , Women , Purse</span>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Product;