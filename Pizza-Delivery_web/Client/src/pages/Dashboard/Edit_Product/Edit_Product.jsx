import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { variantsArr, product_types, categories } from '../../../data';
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
  const [Product_type, setProduct_type] = useState(0);
  const [category, setCategory] = useState(categories[0]);



  const getProductDetails = async () => {
    const data = await getProduct(productId);
    setName(data.name);
    setDescription(data.description);
    setCategory(data.category);
    setProduct_type(data.product_type);
    setVariants(data.variants);
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


  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product_types[Product_type] !== "Pizza" || product_types[Product_type] == "Pizza Crust") {
      setVariants([])
    }

    try {
      await axios.put(`http://localhost:8080/api/product/${productId}/update`, {
        name:name,
        product_type: Product_type,
        variants: [...variants],
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
        {/* Variant */}
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