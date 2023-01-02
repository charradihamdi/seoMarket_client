import React, { useEffect, useState } from "react";
import "./style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import EditorToolbar, { modules, formats } from "./EditorToolbar";

import {
  Modal,
  MaterialInput,
  MaterialButton,
} from "../../components/MaterialUI";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, signout } from "../../actions";

import Layout from "../../components/Layout";

import {
  getProductsByUserId,
  deleteProductById,
  updateProduct,
} from "../../actions/product.action";

import { getAllCategory } from "../../actions";
import { profilePicture } from "../../components/Header/consPicture";

const Website = () => {
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
  const [Pictures, setPictures] = useState("");
  const [pImg, setPImg] = useState([]);
  const [images, setImages] = useState([]);

  const [visitorsPerMonth, setVisitorsPerMounth] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllCategory());
  }, [auth.user._id]);
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsByUserId(auth.user._id));
  }, [auth.user._id]);
  const webSite = useSelector((state) => state.product);
  if (webSite.products[0]) {
    webSite.products = webSite.products.sort(function (a, b) {
      let site1 = Date.parse(a.createdAt);
      let site2 = Date.parse(b.createdAt);

      return site2 - site1;
    });
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
    if (descriptionValueOne === undefined) {
      alert("description required min 50 char");
    }
    let byteSize = (str) => new Blob([str]).size;
    let result = byteSize(descriptionValueOne);
    if (result > 20535) {
      alert("description size is under 2.5MB please resize image ");
      return;
    }
    if (
      !url.includes("https://") &&
      !url.includes("http://") &&
      !url.includes("www.") &&
      !url.includes(".tn") &&
      !url.includes(".org") &&
      !url.includes(".com") &&
      !url.includes(".eng") &&
      !url.includes(".fr")
    ) {
      alert("https:// required in url and domain name ");
    } else if (productPictures.length < 1) {
      alert("insert pictures");
    } else {
      dispatch(addProduct(form)).then(() => {
        setWebsiteModal(false);
        dispatch(getProductsByUserId(auth.user._id));
        setWebsiteUpdateModal(false);
        setCategoryId("");
        setUrl("");
        setDescriptionValueOne("");
        setDevice("");
        setTypeSite("");
        setName("");
        setPublicationPrice("");
        setVisitorsPerMounth("");
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

    if (
      !url.includes("https://") &&
      !url.includes("http://") &&
      !url.includes("www.") &&
      !url.includes(".tn") &&
      !url.includes(".org") &&
      !url.includes(".com") &&
      !url.includes(".eng") &&
      !url.includes(".fr")
    ) {
      alert("HTTP or domain is required in url");
    }
    if (
      categoryId === "" ||
      name === "" ||
      publicationPrice === 0 ||
      devise === "" ||
      visitorsPerMonth === 0
    ) {
      alert("fill forum");
    } else {
      dispatch(updateProduct(siteId, data, auth.user._id)).then(() => {
        setWebsiteUpdateModal(false);
        setCategoryId("");
        setDescriptionValueOne("");
        setPublicationPrice("");
        setVisitorsPerMounth("");
        setTypeSite("");
        setDevice("");
        setName("");
        setProductPictures([]);
        setName("");
      });
    }
  };
  const handlewebSitePictures = (e) => {
    e.preventDefault();
    console.log("event", e);
    const image = URL.createObjectURL(e.target.files[0]);
    setImages([...images, image]);
    console.log("images", images);

    if (productPictures.length < 5)
      setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderwebSites = () => {
    return (
      <div class="col-xl-11 col-lg-11 col-md-12 col-sm-12 ml-3">
        <div class="_dashboard_content ">
          <div class="_dashboard_content_header">
            <div class="_dashboard__header_flex">
              <h4>
                <i class="ti-briefcase mr-1 "></i>Manage Sites
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
                            class="img-fluid "
                            style={{ width: "60px", height: "60px" }}
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
                                {site.publicationPrice}({site.devise})k - (view){" "}
                                {site.visitorsPerMonth}k
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
    );
  };

  const renderUpdateModel = (site) => {
    return (
      <Modal
        visible={websiteUpdateModal}
        onClose={() => setWebsiteUpdateModal(false)}
      >
        <div className="authContainer">
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
  console.log(productPictures, images);

  return (
    <Layout className="header">
      <>
        <section class="gray-bg pt-4" style={{ marginTop: "120px" }}>
          <div class="container-fluid">
            <div class="row m-0 ">
              <div class="col-xl-3 col-lg-4 col-md-12 col-sm-12 ">
                <div class="dashboard-navbar overlio-top">
                  <div class="d-user-avater">
                    <img
                      src={profilePicture}
                      class="img-fluid rounded"
                      alt=""
                    />
                    <h4>{auth.user.fullName}</h4>
                  </div>

                  <div class="d-navigation">
                    <ul>
                      <li class="active">
                        <a href="/website">
                          <i class="ti-dashboard"></i>Dashboard
                        </a>
                      </li>
                      <li class="metismenu">
                        <a href="/profil">
                          <i class="ti-user"></i>My Profile
                        </a>
                      </li>

                      <li onClick={() => dispatch(signout())}>
                        <a href="/">
                          <i></i>Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="bredcrumb_wrap">
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <a href="/">Home</a>
                          </li>

                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            dashboard
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
                <div class="row d-flex justify-content-center  w-100 align-items-center pt-3 ml-2">
                  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                    <div class="dashboard-stat">
                      <div class="dashboard-stat-icon widget-1">
                        <i class="ti-location-pin"></i>
                      </div>
                      <div class="dashboard-stat-content">
                        <h4>
                          <span class="cto">
                            {webSite.products && webSite
                              ? webSite.products.length
                              : 0}
                          </span>
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
                <div className="headerwebsite">
                  <h3 className="titleWebsite">Websites</h3>
                  <button
                    className="btn btn-danger m-3"
                    onClick={() => setWebsiteModal(!websiteModal)}
                  >
                    create
                  </button>
                </div>{" "}
                {renderwebSites()}
              </div>
            </div>
          </div>
        </section>

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
                    value={Pictures}
                    onChange={handlewebSitePictures}
                  />
                  <div
                    style={{
                      border: "1px solid #337BF1",
                      margin: "8px 0px 14px 0px",
                    }}
                  >
                    {" "}
                    <div className="row d-flex ">
                      {productPictures.length > 0
                        ? productPictures.map((pic, index) => (
                            <div key={index} className="col-3 m-4">
                              {
                                <div
                                  style={{
                                    backgroundImage: `url(${images[index]})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain,cover",
                                    width: "200px",
                                    height: "200px",
                                  }}
                                >
                                  <i
                                    className="fa fa-trash top-0 d-flex justify-content-center align-items-center Dpic"
                                    style={{
                                      color: "#F33066",
                                      borderRadius: "6%",
                                      background: "white",
                                      width: "40px",
                                      height: "40px",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setImages(
                                        images.splice(images[index], index)
                                      );

                                      setProductPictures(
                                        productPictures.splice(pic.name, index)
                                      );
                                    }}
                                  ></i>
                                  <span className="bg-danger">{pic.name}</span>
                                </div>
                              }
                            </div>
                          ))
                        : null}
                    </div>
                    {productPictures.length === 5 && (
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
      </>
    </Layout>
  );
};

export default Website;
