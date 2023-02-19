import React, { useCallback, useEffect, useState } from "react";
import "./EditProduct.css";
import MetaData from "../View/MetaData";
import Loader from "../View/Loading";
import Sidebar from "./Sidebar";
import { productDetail } from "../../Reducers/productReducer";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';

const EditProduct = () => {

  const location = useLocation();
  const productId = location.pathname.split('/')[3];
  
  const { loading, products:product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Music",
    "Smartphones",
    "Laptops",
    "Skincare",
    "Groceries",
    "Home-decoration",
    "Furniture",
    "Tops",
    "Womens-dresses",
    "Womens-shoes",
    "Mens-shirts",
    "Mens-shoes",
  ];

  const getProductById = useCallback(() => {
    dispatch(productDetail(productId));
  },[dispatch, productId]);

  useEffect(() => {
    getProductById();
  },[]);
  // const createProductImageChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  const createProductHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      description: desc,
      images,
      category,
      stock,
    };
    // dispatch(createProduct(data));
  };

  console.log(product);
  return (
    <>
      <MetaData title="Update Product" />
      <main className="d-flex flex-nowrap mainDashboard">
        <Sidebar />
        <div className="bg-p">
          
            <div className="container-fluid editProduct">
              <h2>Edit Product</h2>
              <div className="row">
                <div className="col-md-6">
                  <form
                    className=""
                    encType="multipart/form-data"
                    onSubmit={createProductHandler}
                  >
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Product Name"
                        required
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Product Price"
                        required
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <textarea
                        placeholder="Product Description"
                        required
                        name="desc"
                        onChange={(e) => setDesc(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <select
                        className="form-control"
                        required
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">---Select Category---</option>
                        {categories &&
                          categories.map((item) => (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Stock"
                        required
                        name="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3 img-div">
                      <input
                        className="form-control"
                        type="file"
                        required
                        name="avatar"
                        accept="image/*"
                        // onChange={createProductImageChange}
                        multiple
                      />
                    </div>
                    <div className="form-group mb-3 img-prev">
                      {/* {imagesPreview &&
                        imagesPreview.map((image, index) => (
                          <img key={index} src={image} alt="Avatar Preview" />
                        ))} */}
                    </div>
                    <input type="submit" value="Submit" className="btn" />
                  </form>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
          
        </div>
      </main>
    </>
  );
};

export default EditProduct;
