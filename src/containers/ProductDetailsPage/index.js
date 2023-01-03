import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import {
  IoIosArrowForward,
  IoIosStar,
  IoMdCart,
  IoIosHappy,
  IoMdEye,
  IoIosCash,
  IoIosPerson,
} from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";

import parse from "react-html-parser";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
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

  return (
    <Layout>
      <>
        <div
          class=" container page-title search-form dark"
          style={{ marginTop: "150px" }}
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-md-12">
                <img
                  style={{
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "12%",
                  }}
                  src={`http://localhost:5000${product.productDetails.productPictures[0].img}`}
                  class="img-fluid"
                  alt=""
                />
                <div class="_jb_details01">
                  <div class="_jb_details01_flex">
                    <div class="_jb_details01_authors"></div>
                    <div class="_jb_details01_authors_caption">
                      <h4 class="jbs_title">
                        {product.productDetails.name}
                        <img
                          src="assets/img/verify.svg"
                          class="ml-1"
                          width="12"
                          alt=""
                        />
                      </h4>
                      <h4 class="jbs_title">
                        {product.productDetails.url}
                        <img
                          src="assets/img/verify.svg"
                          class="ml-1"
                          width="12"
                          alt=""
                        />
                      </h4>
                      <ul class="jbx_info_list">
                        <li>
                          <div class="jb_types fulltime">
                            <IoIosCash />
                            {product.productDetails.publicationPrice}
                            {product.productDetails.devise}
                          </div>
                        </li>
                        <li>
                          <div class="jb_types urgent">
                            {product.productDetails.visitorsPerMonth}
                            (<IoMdEye />)
                          </div>
                        </li>
                        <li>
                          <div class="jb_types remote">
                            600(
                            <IoIosPerson /> Applied)
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div class="container ">
            <div class="row ">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="_job_detail_box">
                  <div class="_job_detail_single">
                    <h4>site Summary</h4>
                    <p>{parse(product.productDetails.description)}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-12 col-sm-12">
                <div class="_jb_summary">
                  <div class="_jb_summary_thumb">
                    <img
                      src={`http://localhost:5000${product.productDetails.productPictures[0].img}`}
                      class="img-fluid"
                      alt=""
                      style={{ width: "20vw", height: "20vh" }}
                    />
                  </div>
                  <div class="_jb_summary_caption">
                    <h4>{product.productDetails.name}</h4>
                    <span>{product.productDetails.createdAt}</span>
                  </div>
                  <div class="_jb_summary_body">
                    <ul>
                      <li>
                        Email:<span>{product.user.email}</span>
                      </li>
                      <li>
                        Phone<span>+{product.user.contactNumber}</span>
                      </li>
                    </ul>
                    <div class="_view_profile_btns">
                      <a class="btn btn_emplo_eloi">View Company Info</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default ProductDetailsPage;
// <div className="productDescriptionContainer">
// <div className="flexRow">
//   <div className="verticalImageStack">
//     {product.productDetails.productPictures.map((thumb, index) => (
//       <div className="thumbnail">
//         <img
//           src={`http://localhost:5000${thumb.img}`}
//           alt={thumb.img}
//         />
//       </div>
//     ))}
//   </div>
//   <div className="productDescContainer">
//     <div className="productDescImgContainer">
//       <img
//         src={`http://localhost:5000${product.productDetails.productPictures[0].img}`}
//         alt={`${product.productDetails.productPictures[0].img}`}
//       />
//     </div>
//   </div>
// </div>
// <div>
//   <div className="breed">
//     <ul>
//       <li>
//         <a href="/">Home</a>
//         <IoIosArrowForward />
//       </li>

//       <li>
//         <a href="#">{product.productDetails.name}</a>
//       </li>
//     </ul>
//   </div>
//   {/* product description */}
//   <div className="">
//     <p className="ratingCount">{product.productDetails.name}</p>
//     <div className="visitors">
//       visitors per mounth : {product.productDetails.visitorsPerMonth}
//       (k)
//     </div>
//     <div className="">
//       <span className="price">
//         publicationPrice:
//         <span style={{ fontSize: "18px" }}>
//           {product.productDetails.publicationPrice}
//           {product.productDetails.devise}
//         </span>
//       </span>
//     </div>
//     <div>
//       <p
//         style={{
//           color: "#212121",
//           fontSize: "14px",
//           fontWeight: "600",
//         }}
//       >
//         type of site : {product.productDetails.typeSite}
//       </p>
//       <a href={product.productDetails.url}>
//         {product.productDetails.url}
//       </a>
//     </div>
//   </div>
//   <span
//     style={{
//       width: "100px",
//       fontSize: "40px",
//       color: "#878787",
//       fontWeight: "600",
//       marginRight: "20px",
//     }}
//   >
//     <span className="description">Description:</span>
//   </span>
//   <p style={{ display: "flex", padding: "0 0 0 10vw" }}>
//     <span
//       style={{
//         fontSize: "12px",
//         color: "#212121",
//       }}
//     >
//       {parse(product.productDetails.description)}
//     </span>
//   </p>
// </div>
// <div className="userContact">
//   <div className="contact"> Email : {product.user.email}</div>
//   <div className="contact"> Phone:{product.user.contactNumber}</div>
// </div>
// </div>
