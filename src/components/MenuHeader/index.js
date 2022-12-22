import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";
import { getProductsBySlug } from "../../actions/product.action";
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
} from "react-icons/io";
/**
 * @author
 * @function MenuHeader
 **/

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState("All");
  const [dispatchDate, setdispatchDate] = useState(true);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(5000);
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const [minVisitors, setMinVisitors] = useState(10);
  const [maxVisitors, setMaxVisitors] = useState(500000);
  const getSites = () => {
    let payload = {
      slug: categoryId,
      minPrice: minPrice,
      maxPrice: maxPrice,
      maxVisitors: maxVisitors,
      minVisitors: minVisitors,
    };
    if (maxPrice <= minPrice || minVisitors > maxVisitors) {
      return;
    }
    dispatch(getProductsBySlug(payload));
  };
  let i = 0;
  if (dispatchDate) {
    let payload = {
      slug: "All",
      minPrice: minPrice,
      maxPrice: maxPrice,
      maxVisitors: maxVisitors,
      minVisitors: minVisitors,
    };
    dispatch(getProductsBySlug(payload));
    setdispatchDate(false);
  }
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={`/${category.slug}`}>{category.name}</a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
    }
    return options;
  };
  const handleClick = (slug) => {
    window.history.pushState({}, "", `/${slug}`);
    console.log(slug);
  };
  return (
    <div className="menuHeader">
      <select
        className="form-control inputHeader required"
        style={{
          width: "10%",
          marginLeft: "5%",
          marginTop: "px",
          border: "1px solid white",
        }}
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option>select category</option>
        {createCategoryList(category.categories).map((options) => (
          <option key={options.value} value={options.slug} required>
            {options.name}
          </option>
        ))}
      </select>
      <IoIosCash className="iconBts" />
      <label
        className="form-control required"
        style={{
          width: "35%",
          marginTop: "10px",
          border: "1px solid white",
        }}
        required
      >
        min:
        <input
          min={0}
          max={maxPrice}
          className="form inputHeader"
          type={"number"}
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
          style={{
            margin: "0px 0 15px",
            border: "1px solid white",

            width: "140px",
          }}
        />
        max:
        <input
          max="5000"
          min={minPrice}
          type={"number"}
          className="form inputHeader"
          style={{
            margin: "0px 0 15px",
            border: "1px solid white",

            width: "140px",
          }}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        />
      </label>
      <IoMdEye className="iconBts" />
      <label
        className="form-control required"
        style={{
          marginTop: "10px",
          width: "35%",
          border: "1px solid white",
        }}
        required
      >
        min:
        <input
          min={"0"}
          value={minVisitors}
          onChange={(e) => setMinVisitors(e.target.value)}
          type={"number"}
          className="form inputHeader"
          style={{
            margin: "0px 0 15px",
            border: "1px solid white",
          }}
        />
        max:
        <input
          min={"0"}
          value={maxVisitors}
          onChange={(e) => setMaxVisitors(e.target.value)}
          type={"number"}
          className="form inputHeader"
          style={{
            margin: "0px 0 15px",
            border: "1px solid white",
          }}
        />
      </label>
      <button className="btn-search" onClick={getSites}>
        Search
      </button>
    </div>
  );
};

export default MenuHeader;
