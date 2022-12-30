import React, { useEffect, useState } from "react";
import "./style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { useHistory } from "react-router-dom";
import {
  Modal,
  MaterialInput,
  MaterialButton,
} from "../../components/MaterialUI";

import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import Layout from "../../components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import {
  getProductsByUserId,
  deleteProductById,
  updateProduct,
} from "../../actions/product.action";

import { IoIosTrash, IoIosCloudUpload } from "react-icons/io";
import { getAllCategory } from "../../actions";

const Website = () => {
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const [descriptionValueOne, setDescriptionValueOne] = useState();
  const [websiteModal, setWebsiteModal] = useState(false);
  const [websiteUpdateModal, setWebsiteUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [siteId, setSiteId] = useState("");
  const [url, setUrl] = useState("");
  const [publicationPrice, setPublicationPrice] = useState("");
  const [devise, setDevice] = useState("");
  const [typeSite, setTypeSite] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [visitorsPerMonth, setVisitorsPerMounth] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [errorDescription, setErrorDiscription] = useState("");
  const [sexeList, setSexeList] = useState("");
  let history = useHistory();
  const [userInfo, setuserInfo] = useState({
    title: "",
  });
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByUserId(auth.user._id));
  }, [auth]);
  const webSite = useSelector((state) => state.product);
  if (webSite.products[0]) {
    webSite.products = webSite.products.sort(function (a, b) {
      let site1 = Date.parse(a.createdAt);
      let site2 = Date.parse(b.createdAt);

      return site2 - site1;
    });
    console.log(webSite.products);
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
    }
    return options;
  };
  const submitwebSiteForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("url", url);
    form.append("publicationPrice", publicationPrice);
    form.append("description", descriptionValueOne);
    form.append("category", categoryId);
    form.append("devise", devise);
    form.append("typeSite", typeSite);
    form.append("visitorsPerMonth", visitorsPerMonth);
    let i = 0;
    for (let pic of productPictures) {
      i++;
      if (i < 5) form.append("productPicture", pic);
    }

    if (descriptionValueOne.length == undefined) {
      alert("description required min 50 char");
    }
    if (descriptionValueOne.length > 7000) {
      alert("description too long,maximum length required is 5000 char");
      return;
    }
    if (!url.includes("https://")) {
      alert("https:// required in url and domain name ");
    } else if (productPictures.length < 1) {
      alert("insert pictures");
    } else {
      dispatch(addProduct(form)).then(() => {
        setWebsiteModal(false);
        dispatch(getProductsByUserId(auth.user._id));
        setWebsiteUpdateModal(false);
        setCategoryId("");

        setDescriptionValueOne("");
        setDevice("");
        setName("");
        setProductPictures([]);
        setName("");
      });
    }
  };

  const submitwebSiteUpdateForm = () => {
    const data = {
      id: siteId,
      categoryId: categoryId,
      uid: auth.user._id,
      name: name,
      url: url,
      publicationPrice: publicationPrice,
      devise: devise,
      typeSite: typeSite,
      visitorsPerMonth: visitorsPerMonth,
    };
    if (descriptionValueOne.length > 5000) {
      alert("description too long,maximum length required is 5000 char");
    }
    if (!url.includes("https://")) {
      alert("https:// required in url");
    }
    if (
      categoryId == "" ||
      name == "" ||
      publicationPrice == 0 ||
      devise == "" ||
      visitorsPerMonth == 0
    ) {
      alert("fill forum");
    } else {
      dispatch(updateProduct(siteId, data, auth.user._id)).then(() => {
        setWebsiteUpdateModal(false);
        setCategoryId("");
        setDescriptionValueOne("");
        setDevice("");
        setName("");
        setProductPictures([]);
        setName("");
      });
    }
  };
  const handlewebSitePictures = (e) => {
    if (productPictures.length < 5)
      setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderwebSites = () => {
    return (
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="_dashboard_content">
            <div class="_dashboard_content_header">
              <div class="_dashboard__header_flex">
                <h4>
                  <i class="ti-briefcase mr-1"></i>Manage Sites
                </h4>
              </div>
            </div>

            {webSite.products && webSite
              ? webSite.products.map((site) => {
                  return (
                    <div class="_dashboard_content_body p-0">
                      <div class="_dashboard_list_group">
                        <div class="_dash_singl_box">
                          <div class="_dash_singl_thumbs">
                            <img
                              src={`http://localhost:5000${site.productPictures[0].img}`}
                              class="img-fluid"
                              alt=""
                            />
                          </div>
                          <div class="_dash_singl_captions">
                            <h4 class="_jb_title">
                              <a> {site.name}</a>
                              <span class="_dash_status approval">
                                {site.isActive ? (
                                  <span
                                    style={{
                                      color: "green",
                                      border: "1px solid white",
                                    }}
                                  >
                                    active
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: "red",
                                      border: "1px solid white",
                                    }}
                                  >
                                    not active
                                  </span>
                                )}
                              </span>
                            </h4>
                            <ul class="_grouping_list">
                              <li>
                                <span>
                                  <i class="ti-credit-card"></i>$
                                  {site.publicationPrice}
                                  {site.visitorsPerMonth}k - (view)120k
                                </span>
                              </li>
                              <li>
                                <span>
                                  <i class="ti-timer"></i>created At{" "}
                                  {site.createdAt}
                                </span>
                              </li>
                            </ul>
                            <ul class="_action_grouping_list">
                              <li>
                                <a class="_aaplied_candidates">
                                  Applied<span>45</span>
                                </a>
                              </li>

                              <li onClick={() => setWebsiteUpdateModal(true)}>
                                <a
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit job"
                                  class="_edit_list_point"
                                >
                                  <i class="fa fa-edit"></i>
                                </a>
                              </li>
                              <li
                                onClick={() => {
                                  const payload = {
                                    productId: site._id,
                                  };
                                  dispatch(deleteProductById(payload)).then(
                                    () => {
                                      dispatch(
                                        getProductsByUserId(auth.user._id)
                                      );
                                    }
                                  );
                                }}
                              >
                                <a
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Delete Job"
                                  class="_delete_point"
                                >
                                  <i class="fa fa-trash"></i>
                                </a>
                              </li>
                            </ul>
                            {renderUpdateModel(site)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  };

  const renderUpdateModel = (site) => {
    return (
      <Modal
        visible={websiteUpdateModal}
        onClose={() => setWebsiteUpdateModal(false)}
      >
        <h3 className="headUpdate">Update website </h3>
        <div
          className="authContainer"
          style={{
            border: "1px solid white",
            padding: "10px 10px 10px 10px",
          }}
        >
          <div className="row">
            <div className="rightspace">
              <div className="loginInputContainer">
                <MaterialInput
                  type="text"
                  label="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSiteId(site._id);
                  }}
                />
                <MaterialInput
                  type="url"
                  label="url site"
                  placeholder="https://example.com"
                  pattern="https://.*"
                  size="30"
                  value={url}
                  onChange={(e) => {
                    setSiteId(site._id);
                    setUrl(e.target.value);
                  }}
                />

                <MaterialInput
                  className="required"
                  type="Number"
                  label="publication Price"
                  value={publicationPrice}
                  onChange={(e) => {
                    setPublicationPrice(e.target.value);
                    setSiteId(site._id);
                  }}
                />

                <MaterialInput
                  className="required"
                  type="Number"
                  label="Number of visitors Per Month"
                  value={visitorsPerMonth}
                  onChange={(e) => {
                    setVisitorsPerMounth(e.target.value);
                    setSiteId(site._id);
                  }}
                />

                <>
                  <select
                    className="form-control required"
                    style={{
                      width: "100%",
                      border: "1px solid white",
                      borderBottom: "2px solid #2874F0",
                    }}
                    value={devise}
                    onChange={(e) => {
                      setDevice(e.target.value);
                      setSiteId(site._id);
                    }}
                    required
                  >
                    <option>select devise </option>
                    <option value="Usd">Usd</option>
                    <option value="Euro">Euro</option>
                    <option value="Tnd">Tnd</option>
                  </select>
                </>

                <select
                  className="form-control required"
                  style={{
                    width: "100%",

                    border: "1px solid white",
                    borderBottom: "2px solid #2874F0",
                  }}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option>select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value} required>
                      {option.name}
                    </option>
                  ))}
                </select>
                <>
                  <select
                    className="form-control required"
                    style={{
                      width: "100%",
                      border: "1px solid white",
                      borderBottom: "2px solid #2874F0",
                    }}
                    value={typeSite}
                    onChange={(e) => {
                      setTypeSite(e.target.value);
                      setSiteId(site._id);
                    }}
                    required
                  >
                    <option>select type of site </option>

                    <option value="site">site</option>
                    <option value="blog">blog</option>
                    <option value="Magazine">Magazine</option>
                  </select>
                </>

                <MaterialButton
                  title={"submit"}
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                    width: "full-content",
                  }}
                  onClick={() => {
                    submitwebSiteUpdateForm();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  const handleEditor = (e) => {
    setDescriptionValueOne(e);
  };
  return (
    <Layout className="header">
      <div className="container">
        <div className="headerwebsite" style={{ marginTop: "120px" }}>
          <h3 className="titleWebsite">Websites</h3>
          <button
            className="btn btn-danger m-3"
            onClick={() => setWebsiteModal(!websiteModal)}
          >
            create
          </button>
        </div>{" "}
        <div class="row d-flex justify-content-center  w-100 align-items-center pt-3 ml-2">
          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div class="dashboard-stat">
              <div class="dashboard-stat-icon widget-1">
                <i class="ti-location-pin"></i>
              </div>
              <div class="dashboard-stat-content">
                <h4>
                  <span class="cto">72</span>
                </h4>{" "}
                <p>sites Posted</p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div class="dashboard-stat">
              <div class="dashboard-stat-icon widget-2">
                <i class="ti-pie-chart"></i>
              </div>
              <div class="dashboard-stat-content">
                <h4>
                  <span class="cto">12</span>M
                </h4>{" "}
                <p>Total Viewed</p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div class="dashboard-stat">
              <div class="dashboard-stat-icon widget-3">
                <i class="ti-user"></i>
              </div>
              <div class="dashboard-stat-content">
                <h4>
                  <span class="cto">72</span>K
                </h4>{" "}
                <p>User Applied</p>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
            <div class="dashboard-stat">
              <div class="dashboard-stat-icon widget-4">
                <i class="ti-bookmark"></i>
              </div>
              <div class="dashboard-stat-content">
                <h4>
                  <span class="cto">80</span>
                </h4>{" "}
                <p>site Bookmarked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal visible={websiteModal} onClose={() => setWebsiteModal(false)}>
        <div
          className="authContainer"
          style={{
            width: "1500px",
            height: "120vh",
          }}
        >
          <div className="row">
            <div className="rightspace">
              <div className="loginInputContainer">
                <MaterialInput
                  type="text"
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <MaterialInput
                  type="url"
                  label="url https://example.com"
                  placeholder="https://example.com"
                  pattern="https://.*"
                  size="30"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <div
                  className="form-group col-md-12 editor "
                  style={{
                    marginTop: "20px",
                    border: "2px solid #2874F0",
                    height: "60vh",
                  }}
                >
                  <div className="form-group col-md-12 editor">
                    <label className="font-weight-bold"></label>
                    <EditorToolbar toolbarId={"t2"} />
                    <ReactQuill
                      className="scroll"
                      theme="snow"
                      value={descriptionValueOne}
                      onChange={(e) => handleEditor(e)}
                      placeholder={"Write something awesome..."}
                      modules={modules("t2")}
                      formats={formats}
                    />
                  </div>
                </div>

                <MaterialInput
                  className="required"
                  type="Number"
                  label="publication Price"
                  value={publicationPrice}
                  onChange={(e) => setPublicationPrice(e.target.value)}
                  required
                />
                <MaterialInput
                  className="required"
                  type="Number"
                  label="Number of visitors Per Month"
                  value={visitorsPerMonth}
                  onChange={(e) => setVisitorsPerMounth(e.target.value)}
                  required
                />
                <br />

                <select
                  className="form-control required"
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    border: "1px solid white",
                    borderBottom: "2px solid #2874F0",
                  }}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                >
                  <option>select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value} required>
                      {option.name}
                    </option>
                  ))}
                </select>
                <>
                  <select
                    className="form-control required"
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      border: "1px solid white",
                      borderBottom: "2px solid #2874F0",
                    }}
                    value={devise}
                    onChange={(e) => setDevice(e.target.value)}
                    required
                  >
                    <option>select device </option>

                    <option value="Usd">Usd</option>
                    <option value="Euro">Euro</option>
                    <option value="Tnd">Tnd</option>
                  </select>
                </>
                <>
                  <select
                    className="form-control required"
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      border: "1px solid white",
                      borderBottom: "2px solid #2874F0",
                    }}
                    value={typeSite}
                    onChange={(e) => setTypeSite(e.target.value)}
                    required
                  >
                    <option>select type of site </option>

                    <option value="site">site</option>
                    <option value="blog">blog</option>
                    <option value="Magazine">Magazine</option>
                  </select>
                </>

                <input
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    border: "1px solid white",
                    borderBottom: "2px solid #2874F0",
                  }}
                  className="form-control required"
                  type="file"
                  name="webSitePicture"
                  onChange={handlewebSitePictures}
                />
                <div
                  style={{
                    border: "1px solid grey",
                    margin: "8px 0px 14px 0px",
                  }}
                >
                  {" "}
                  {productPictures.length > 0
                    ? productPictures.map((pic, index) => (
                        <div key={index}>{pic.name}</div>
                      ))
                    : null}
                  {productPictures.length == 5 && (
                    <p style={{ color: "red" }}>max 5 images</p>
                  )}
                </div>
                <MaterialButton
                  className="required"
                  title={"submit"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={submitwebSiteForm}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Container>
        <Row>
          <Col>{renderwebSites()}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Website;
