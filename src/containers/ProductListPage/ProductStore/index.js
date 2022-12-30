import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
  MdPriceCheck,
  IoIosCash,
  IoMdEye,
  IoIosQrScanner,
} from "react-icons/io";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import Layout from "../../../components/Layout";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import parse from "html-react-parser";
import { profilePicture } from "../../../components/Header/consPicture";
import "./style.css";
import { getProductsByUserId } from "../../../actions/product.action";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MenuHeader from "../../../components/MenuHeader";
const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);
  if (product.products[0]) {
    product.products = product.products.sort(function (a, b) {
      let site1 = Date.parse(a.createdAt);
      let site2 = Date.parse(b.createdAt);

      return site2 - site1;
    });
  }
  return (
    <>
      <Layout />
      <MenuHeader />

      <div className="container mt-2">
        {product.products.map((site, i) => (
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="_list_jobs_wraps shadow_0">
                <img
                  src={
                    site.typeSite == "blog" ? "assets/img/job-featured.png" : ""
                  }
                  class="_featured_jbs"
                  alt=""
                />
                <div class="_list_jobs_f1ex first">
                  <div class="_list_110">
                    <div class="_list_110_thumb">
                      <a>
                        <Carousel renderThumbs={() => {}}>
                          {site.productPictures.map((banner, index) => (
                            <a
                              key={index}
                              style={{ display: "block" }}
                              href={banner.navigateTo}
                            >
                              <img
                                className="img-fluid"
                                style={{ height: "80px", width: "100px" }}
                                src={`http://localhost:5000${banner.img}`}
                                alt={banner.img}
                              />
                            </a>
                          ))}
                        </Carousel>
                      </a>
                    </div>
                    <div class="_list_110_caption">
                      <h4 class="_jb_title">
                        <a href="job-detail.html">{site.name}</a>
                      </h4>
                      <div class="_emp_jb">{site.url}</div>
                    </div>
                  </div>
                </div>
                <div class="_list_jobs_f1ex">
                  <div class="_list_110_caption">
                    <h4 class="_jb_title">{site.typeSite}</h4>
                    <div class="_emp_jb"></div>
                  </div>
                </div>
                <div class="_list_jobs_f1ex">
                  <div class="_list_110_caption">
                    <h4 class="_jb_title">
                      {site.devise} {site.publicationPrice}
                    </h4>
                    <div class="_emp_jb">
                      (<IoMdEye />){site.visitorsPerMonth}
                    </div>
                  </div>
                </div>
                <div class="_list_jobs_f1ex">
                  <Link to={`/product/${site._id}`} className="_jb_apply">
                    View Site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductStore;
// <div>
// <div className="headList">
//   <h3 className="itemTitle"></h3>
//   <h3 className="itemTitle">websites links</h3>
//   <h3 className="itemTitle">type of website</h3>
//   <h3 className="itemTitle">Price</h3>
//   <h3 className="itemTitle">Visitors per mounth</h3>
// </div>
// {product.products.map((site) => (
//   <div className="displaysites">
//     <div className="carouselItems">
//       <Carousel renderThumbs={() => {}}>
//         {site.productPictures.map((banner, index) => (
//           <a
//             key={index}
//             style={{ display: "block" }}
//             href={banner.navigateTo}
//           >
//             <img
//               style={{ height: "80px", width: "100px" }}
//               src={`http://localhost:5000${banner.img}`}
//               alt={banner.img}
//             />
//           </a>
//         ))}
//       </Carousel>
//     </div>
//     <Link to={`/product/${site._id}`} className="infosite">
//       <div className="infosite">
//         <p style={{ width: "30vw" }}>
//           <div style={{ display: "flex", width: "56px" }}>
//             {<Link>{site.url}</Link>}
//           </div>
//         </p>
//         <p class="">
//           <div>{site.typeSite}</div>
//         </p>
//         <p class="">
//           <div>
//             {site.publicationPrice}
//             {site.devise}
//           </div>
//         </p>
//         <p class="">
//           <div>{site.visitorsPerMonth}(k)</div>
//         </p>
//       </div>
//     </Link>
//   </div>
// ))}
// </div>
