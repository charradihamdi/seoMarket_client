import React from "react";
import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import ProductStore from "./ProductStore";
import "./style.css";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    content = <ProductStore {...props} />;
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
