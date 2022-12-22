import React, { useEffect, useState } from "react";
import "./style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useHistory } from "react-router-dom";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import Cart from "../../components/UI/Cart";
import ReactHtmlParser from "react-html-parser";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
  MaterialSelect,
} from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import { NavLink, Link } from "react-router-dom";
import { profilePicture } from "../../components/Header/consPicture";
import Layout from "../../components/Layout";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
  getProductsByUserId,
  deleteProductById,
  updateProduct,
} from "../../actions/product.action";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from "react-icons/io";
import { getAllCategory } from "../../actions";
const Website = () => {
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const [descriptionValueOne, setDescriptionValueOne] = useState({});
  const [websiteModal, setWebsiteModal] = useState(false);
  const [websiteUpdateModal, setWebsiteUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [siteId, setSiteId] = useState("");
  const [url, setUrl] = useState("https://");
  const [publicationPrice, setPublicationPrice] = useState(0);
  const [devise, setDevice] = useState("");
  const [typeSite, setTypeSite] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [visitorsPerMonth, setVisitorsPerMounth] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [errorDescription, setErrorDiscription] = useState("");
  const [sexeList, setSexeList] = useState("");
  let history = useHistory();
  const [userInfo, setuserInfo] = useState({
    title: "",
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);

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
  useEffect(() => {
    setProductsList(webSite.products.products);
  }, [webSite]);

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
    if (!url.includes("https://") || !url.includes(".")) {
      alert("https:// required in url and domain name ");
    } else if (productPictures.length < 1) {
      alert("insert pictures");
    } else {
      dispatch(addProduct(form)).then(() => {
        setWebsiteModal(false);
        dispatch(getProductsByUserId(auth.user._id));
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
      });
    }
  };
  const handlewebSitePictures = (e) => {
    if (productPictures.length < 5)
      setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderwebSites = () => {
    return (
      <Container className="cardItems">
        {webSite.products && webSite
          ? webSite.products.map((site) => {
              return (
                <>
                  <ul className="cards">
                    <li>
                      <div className="action">
                        <button
                          onClick={() => {
                            const payload = {
                              productId: site._id,
                            };
                            dispatch(deleteProductById(payload)).then(() => {
                              dispatch(getProductsByUserId(auth.user._id));
                            });
                          }}
                        >
                          <IoIosTrash className="iconSite" />
                        </button>
                        {renderUpdateModel(site)}
                        <button>
                          <IoIosCloudUpload
                            className="iconSite"
                            onClick={() => setWebsiteUpdateModal(true)}
                          />
                        </button>
                      </div>
                      <a className="card">
                        <div className="card__overlay">
                          <div className="card__header">
                            <svg
                              className="card__arc"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path />
                            </svg>
                            <img
                              className="card__thumb"
                              src={`http://localhost:5000${site.productPictures[0].img}`}
                              alt=""
                            />
                            <div className="card__header-text">
                              <h3 className="card__title">{site.name}</h3>
                              <span className="card__status">
                                {site.createdAt}
                              </span>
                            </div>
                            <span className="">
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
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </>
              );
            })
          : null}
      </Container>
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
            width: "1200px",
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
                <br />

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
      <div className="headerwebsite">
        <h3 className="titleWebsite">Websites</h3>
        <button
          className="buttonwebsiteadd"
          onClick={() => setWebsiteModal(!websiteModal)}
        >
          create Site
        </button>
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
