import React, { useEffect, useState } from "react";
import "./Product.css";
import { useNavigate, useParams } from "react-router-dom";
import toppingImg from "../../assets/veg-toppings.jpg";
import { getProduct } from "../../hooks/getProduct";
import { categories, product_types } from "../../data";
import axios from "axios";



const Product = () => {

  const navigate = useNavigate();
  const { productId } = useParams();


  const [name, setName] = useState("");
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [imgLink, setImgLink] = useState(" ");
  const [Product_type, setProduct_type] = useState(0);
  const [variants, setVariants] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [category, setCategory] = useState(categories[0]);



  const getProductDetails = async () => {
    const data = await getProduct(productId);
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
    setDescription(data.description);
    setVariants(data.variants);
    setExtraOptions(data.extraOptions);
    setProduct_type(data.product_type);
    setImgLink(data.image);




  }

  useEffect(() => {
    getProductDetails();

  }, []);



  const [variantVal, setVariantVal] = useState(variants[0]);
  const [optionsVal, setOptionsVal] = useState([]);

  const handleChooseExtraOptions = (e, option) => {
    if (e.target.checked) {
      setOptionsVal([...optionsVal, { name: option.name, category: option.category, price: option.price }]);

    } else {
      optionsVal.pop();
    }

  }



  const addToCart = async () => {
    if (Product_type == 0) {
      try {
        await axios.post(`http://localhost:8080/api/product/cart/addToCart`, {
          name,
          variant: variantVal,
          extraOptions: [...optionsVal],
          price,
          quantity,
          category,
          productId:productId
        },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            }
          }

        );
        alert("Item added to cart successfully!");
        navigate("/profile_dashboard/cart");
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
      }
    }


  }


  return (
    <>
      <div className="product">
        <div className="left">
          <div className="mainImg">
            <img src={imgLink !== " " ? imgLink : toppingImg} alt={name} />
          </div>
        </div>
        <div className="right">
          <h1 className="title"> {name !== "" && name[0].toUpperCase() + name.substring(1)}</h1>
          <div className="prices">
            <h2 className="oldPrice">{price + 250}rs</h2>
            <h2 className="price">{price}rs</h2>
          </div>


          <span className="product-desc description">
            {description.trim().slice(10)}
          </span>

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
          <div className="option" id='variant-option-container'>
            <label htmlFor="variant">Choose a Variant : </label>
            <select name="variant" id="variant" value={JSON.stringify({ name: variantVal?.name, price: variantVal?.price })} onChange={(e) => { setVariantVal(JSON.parse(e.target.value)) }} >
              {variants.map(variant => (
                <option value={JSON.stringify({ name: variant.name, price: variant.price })} key={`variant-${variants.indexOf(variant)}`}>{variant.name} : ({variant.price}rs)</option>
              ))}
            </select>

          </div>

          {Product_type == 0 && (
            <button className="add poppins-semibold" type="button" onClick={addToCart} >
              <p className="btn-text">
                ADD TO CART <i className="fa-solid fa-cart-shopping cart-icon"></i>
              </p>
            </button>
          )}
          <div className="option-check">
            <span id="option">Choose Extra Options : </span>
            {extraOptions.map(option => (
              <div className="option" key={extraOptions.indexOf(option)}>
                <input
                  type="checkbox"
                  className="sauces-option"
                  id={`options-${extraOptions.indexOf(option)}`}
                  value={{ name: option.name, category: option.category, price: option.price }}
                  onChange={(e) => { handleChooseExtraOptions(e, option) }}
                />
                <label htmlFor={`options-${extraOptions.indexOf(option)}`}>{option.name}({option.category})=-&gt;({option.price}rs)</label>
              </div>
            ))}
          </div>
          <div className="info">
            <span>Vendor : PizzaLand</span>
            <span>Product Type : {product_types[Product_type]}</span>
            <span>Category: {category}</span>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Product;