import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { variantsArr, SaucesArr, toppingsArr, product_types, categories } from '../../../data';
import "../../../AddProduct_EditProduct.css";
import { getProduct } from '../../../hooks/getProduct';
import { useSelector } from 'react-redux';
import axios from 'axios';




const Edit_Product = () => {

  const { data: user } = useSelector((state) => state.user);

  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(20);
  const [price, setPrice] = useState(150);
  const [imgLink, setImgLink] = useState(" ");
  const [variants, setVariants] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [Product_type, setProduct_type] = useState(0);
  const [category, setCategory] = useState(categories[0]);



  const getProductDetails = async () => {
    const data = await getProduct(productId);
    setName(data.name);
    setDescription(data.description);
    setCategory(data.category);
    setProduct_type(data.product_type);
    setVariants(data.variants);
    setExtraOptions(data.extraOptions);
    setQuantity(data.quantity);
    setPrice(data.price);
    setImgLink(data.image);

  }

  useEffect(() => {

    if (user.isAdmin == "false") {
      navigate("/");
    } else {
      getProductDetails();
    }
  }, []);


  let mainVarArr = [...variantsArr];
  let varValues = [...variants];

  for (var i = mainVarArr.length - 1; i >= 0; i--) {
    for (var j = 0; j < varValues.length; j++) {
      if (mainVarArr[i] && (mainVarArr[i].name === varValues[j].name)) {
        mainVarArr.splice(i, 1);
      }
    }
  }


  let optionsArr = [...extraOptions];
  let sauces = [...SaucesArr];
  let toppings = [...toppingsArr];


  for (var i = sauces.length - 1; i >= 0; i--) {
    for (var j = 0; j < optionsArr.length; j++) {
      if (sauces[i] && (sauces[i].name === optionsArr[j].name)) {
        sauces.splice(i, 1);
      }
    }
  }
  for (var i = toppings.length - 1; i >= 0; i--) {
    for (var j = 0; j < optionsArr.length; j++) {
      if (toppings[i] && (toppings[i].name === optionsArr[j].name)) {
        toppings.splice(i, 1);
      }
    }
  }



  const handleDeleteVariants = (variant) => {


    let arr = new Set([...variants])
    arr.delete(variant);
    setVariants(Array.from(arr));


  }




  const handleChooseVariant = (e, variant) => {
    if (e.target.checked) {
      setVariants([...variants, { name: variant.name, price: variant.price }]);

    } else {
      variants.pop();
    }

  }

  const handleDeleteExtraOptions = (option) => {


    let arr = new Set([...extraOptions]);
    arr.delete(option);
    setExtraOptions(Array.from(arr));

  }


  const handleChooseExtraOptions = (e, option) => {
    if (e.target.checked) {
      setExtraOptions([...extraOptions, { name: option.name, category: option.category, price: option.price }]);

    } else {
      extraOptions.pop();
    }

  }


  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product_types[Product_type] !== "Pizza") {
      setExtraOptions([]);
    }
    if (product_types[Product_type] !== "Pizza" || product_types[Product_type] == "Pizza Crust") {
      setVariants([])
    }

    try {
      await axios.put(`http://localhost:8080/api/product/${productId}/update`, {
        name:name,
        product_type: Product_type,
        variants: [...variants],
        extraOptions: [...extraOptions],
        price:price,
        quantity:quantity,
        description:description,
        category:category,
        image:imgLink
      },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          }
        }

      );
      alert("Product updated successfully!");
      navigate("/profile_dashboard/view_products");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }

  }




  return (
    <div style={{ width: "100%" }}>
      <h1 className='poppins-semibold section-title form-title'>Edit Product</h1>
      <form className='form' id="addProduct"
        onSubmit={handleSubmit}
      >
        <input type="text" name="name" id="name" placeholder='Product Name' value={name} onChange={(e) => { setName(e.target.value) }} required />
        <textarea name="description" id="description" placeholder='Product Description' value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>
        <div className="option" id='product_type-option-container'>
          <label htmlFor="product_type">Product Type : </label>
          <select name="product_type" id="product_type" value={Product_type} onChange={(e) => { setProduct_type(e.target.value) }}>
            {product_types.map(product_type => (
              <option value={product_types.indexOf(product_type)} key={`product_type-${product_types.indexOf(product_type)}`} >{product_type}</option>
            ))}
          </select>
        </div>
        {/* Variant & extraoptions */}
        {(product_types[Product_type] == "Pizza" || product_types[Product_type] == "Pizza Crust") ? (
          <>
            <hr />
            <div className='variants-container' >
              <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Variants</p>
              <div className="options-container">
                <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Selected Variants: </p>
                {varValues.map(variant => (
                  <div className="option" key={variant.name}>
                    <span id={`variant-${variant._id}`}>{variant.name}</span>
                    <input type="text" name="variant-price" value={`Price : ${variant.price}rs`} style={{ padding: ".3rem" }} readOnly />
                    <button type='button' onClick={() => { handleDeleteVariants(variant) }} ><i className="fa-solid fa-xmark"></i></button>
                  </div>
                ))}
              </div>
              <br />
              <div className="options-container" >


                {mainVarArr.map(variant => (
                  <div className="option" key={variant.id}>
                    <input
                      type="checkbox"
                      className="variants-option"
                      id={`variant-${variant.id}`}
                      value={{ name: variant.name, price: variant.price }}
                      onChange={(e) => { handleChooseVariant(e, variant) }}
                    />
                    <label htmlFor={`variant-${variant.id}`}>{variant.name}</label>
                    <input type="text" name="variant-price" value={`Price : ${variant.price}rs`} style={{ padding: ".3rem" }} readOnly />
                  </div>
                ))}


              </div>
            </div>
          </>
        ) : (
          <hr />
        )}

        {(product_types[Product_type] == "Pizza") ? (
          <>
            <hr />
            <div className='extraOptions-container' >
              <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Extra Options: </p>
              <div className="options-container">
                <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Selected Options: </p>
                {extraOptions.map(option => (
                  <div className="option" key={extraOptions.indexOf(option)}>
                    <span id={`options-${option._id}`}>{option.name}({option.category})</span>
                    <input type="text" name="option-price" value={`Price : ${option.price}rs`} style={{ padding: ".3rem" }} readOnly />
                    <button type='button' onClick={() => { handleDeleteExtraOptions(option) }} ><i className="fa-solid fa-xmark"></i></button>
                  </div>
                ))}
              </div>
              <div className="flex-container" style={{ alignItems: 'flex-start' }}>
                <div className="options-container" >
                  <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Sauces: </p>

                  {SaucesArr.map(sauce => (
                    <div className="option" key={SaucesArr.indexOf(sauce)}>
                      <input
                        type="checkbox"
                        className="sauces-option"
                        id={`sauces-${SaucesArr.indexOf(sauce)}`}
                        value={{ name: sauce.name, category: sauce.category, price: sauce.price }}
                        onChange={(e) => { handleChooseExtraOptions(e, sauce) }}
                      />
                      <label htmlFor={`sauces-${SaucesArr.indexOf(sauce)}`}>{sauce.name}({sauce.category})</label>
                      <input type="text" name="sauce-price" value={`Price : ${sauce.price}rs`} style={{ padding: ".3rem" }} readOnly />
                    </div>
                  ))}

                </div>
                <div className="options-container">
                  <p className='poppins-medium' style={{ textAlign: "center", color: "var(--text-colora)" }}>Toppings: </p>
                  {toppingsArr.map(topping => (
                    <div className="option" key={toppingsArr.indexOf(topping)}>
                      <input
                        type="checkbox"
                        className="sauces-option"
                        id={`toppings-${toppingsArr.indexOf(topping)}`}
                        value={{ name: topping.name, category: topping.category, price: topping.price }}
                        onChange={(e) => { handleChooseExtraOptions(e, topping) }}
                      />
                      <label htmlFor={`toppings-${toppingsArr.indexOf(topping)}`}>{topping.name}({topping.category})</label>
                      <input type="text" name="topping-price" value={`Price : ${topping.price}rs`} style={{ padding: ".3rem" }} readOnly />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <hr />
          </>
        )}

        <div className="option" id='category-option-container'>
          <label htmlFor="category">Product Category : </label>
          <select name="category" id="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
            {categories.map(category => (
              <option value={category} key={`category-${categories.indexOf(category)}`} >{category}</option>
            ))}
          </select>
        </div>
        <input type="number" name="quantity" id="quantity" placeholder='Product Quantity' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} required min={1} />
        <input type="number" name="price" id="price" placeholder='$ Price' value={price} onChange={(e) => { setPrice(e.target.value) }} required min={1} />
        <input type="text" name="imgLink" id="imgLink" placeholder='Product Image Link' value={imgLink} onChange={(e) => { setImgLink(e.target.value) }} />
        <button type="submit" id='update-product-btn'>Edit Product</button>
      </form>
    </div>
  )
}

export default Edit_Product;