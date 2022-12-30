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
  IoIosQrScanner,
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
  const product = useSelector((state) => state.product);
  const [minVisitors, setMinVisitors] = useState(10);
  const [maxVisitors, setMaxVisitors] = useState(5000);
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
    <div className="container" style={{ marginTop: "80px" }}>
      <div class="row ">
        <div class="col-lg-12 col-md-12 col-sm-12 ">
          <div class="_filt_tag786">
            <div class="form-group filter_group m-0">
              <div class="_tag780">{product.products.length}Items found</div>
            </div>
            <div class="_tag785 mr-2">
              <div class="_g78juy w-100">
                <select
                  class="form-control m-2"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option>Category</option>
                  {createCategoryList(category.categories).map((options) => (
                    <option key={options.value} value={options.slug} required>
                      {options.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="_tag785">
              <div class="__g72juy ml-1">
                <a class="_ujh_tyr">
                  <i class="ti-layout-grid ">
                    <IoIosCash />
                  </i>
                </a>
              </div>
              <div class="_g78juy w-60">
                <input
                  min={0}
                  max={maxPrice}
                  className="form-control"
                  type={"number"}
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                />
              </div>
              <div class="__g72juy ml-1">
                <a class="_ujh_tyr">
                  <i class="ti-layout-grid ">to</i>
                </a>
              </div>
              <div class="_g78juy w-30">
                <input
                  max="5000"
                  min={minPrice}
                  className="form-control"
                  type={"number"}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                />
              </div>
            </div>{" "}
            <div class="_tag785"></div>{" "}
            <div class="_tag785">
              <div class="__g72juy ml-1">
                <a class="_ujh_tyr">
                  <i class="ti-layout-grid ">
                    <IoMdEye />
                  </i>
                </a>
              </div>
              <div class="_g78juy w-30">
                <input
                  value={minVisitors}
                  onChange={(e) => setMinVisitors(e.target.value)}
                  min={0}
                  max={"5000"}
                  className="form-control"
                  type={"number"}
                />
              </div>
              <div class="__g72juy ml-1">
                <a class="_ujh_tyr">
                  <i class="ti-layout-grid ">to</i>
                </a>
              </div>
              <div class="_g78juy w-30">
                <input
                  min={0}
                  max={"5000"}
                  className="form-control"
                  value={maxVisitors}
                  onChange={(e) => setMaxVisitors(e.target.value)}
                  type={"number"}
                />
              </div>
            </div>{" "}
            <div class="_tag785">
              <div class="__g72juy ml-1">
                <button
                  class="bg-danger _ujh_tyr border-0"
                  style={{ color: "white", height: "7vh", width: "40px" }}
                  onClick={getSites}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
