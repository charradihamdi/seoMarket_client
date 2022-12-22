import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";

import parse from "react-html-parser";
import { Link } from "react-router-dom";
/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { productId } = props.match.params;

    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload)).then(() => {});
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }
  console.log(product.productDetails);
  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {product.productDetails.productPictures.map((thumb, index) => (
              <div className="thumbnail">
                <img
                  src={`http://localhost:5000${thumb.img}`}
                  alt={thumb.img}
                />
              </div>
            ))}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={`http://localhost:5000${product.productDetails.productPictures[0].img}`}
                alt={`${product.productDetails.productPictures[0].img}`}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="breed">
            <ul>
              <li>
                <a href="/">Home</a>
                <IoIosArrowForward />
              </li>

              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="">
            <p className="ratingCount">{product.productDetails.name}</p>
            <div className="visitors">
              visitors per mounth : {product.productDetails.visitorsPerMonth}
              (k)
            </div>
            <div className="">
              <span className="price">
                publicationPrice:
                <span style={{ fontSize: "18px" }}>
                  {product.productDetails.publicationPrice}
                  {product.productDetails.devise}
                </span>
              </span>
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                type of site : {product.productDetails.typeSite}
              </p>
              <a href={product.productDetails.url}>
                {product.productDetails.url}
              </a>
            </div>
          </div>
          <span
            style={{
              width: "100px",
              fontSize: "40px",
              color: "#878787",
              fontWeight: "600",
              marginRight: "20px",
            }}
          >
            <span className="description">Description:</span>
          </span>
          <p style={{ display: "flex", padding: "0 0 0 10vw" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#212121",
              }}
            >
              {parse(product.productDetails.description)}
            </span>
          </p>
        </div>
        <div className="userContact">
          <div className="contact"> Email : {product.user.email}</div>
          <div className="contact"> Phone:{product.user.contactNumber}</div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
