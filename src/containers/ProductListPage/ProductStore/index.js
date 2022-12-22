import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
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
      <div>
        <div className="headList">
          <h3 className="itemTitle"></h3>
          <h3 className="itemTitle">websites links</h3>
          <h3 className="itemTitle">type of website</h3>
          <h3 className="itemTitle">Price</h3>
          <h3 className="itemTitle">Visitors per mounth</h3>
        </div>
        {product.products.map((site) => (
          <div className="displaysites">
            <div className="carouselItems">
              <Carousel renderThumbs={() => {}}>
                {site.productPictures.map((banner, index) => (
                  <a
                    key={index}
                    style={{ display: "block" }}
                    href={banner.navigateTo}
                  >
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={`http://localhost:5000${banner.img}`}
                      alt={banner.img}
                    />
                  </a>
                ))}
              </Carousel>
            </div>
            <Link to={`/product/${site._id}`} className="infosite">
              <div className="infosite">
                <p style={{ width: "30vw" }}>
                  <div style={{ display: "flex", width: "56px" }}>
                    {<Link>{site.url}</Link>}
                  </div>
                </p>
                <p class="">
                  <div>{site.typeSite}</div>
                </p>
                <p class="">
                  <div>
                    {site.publicationPrice}
                    {site.devise}
                  </div>
                </p>
                <p class="">
                  <div>{site.visitorsPerMonth}(k)</div>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductStore;
