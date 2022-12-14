import React, { useEffect, useState } from "react";
import "./style.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useHistory } from "react-router-dom";
import goldenStar from "../../images/logo/golden-star.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import draftToHtml from "draftjs-to-html";
import Cart from "../../components/UI/Cart";
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
import { getProductsByUserId } from "../../actions/product.action";

/**
 * @author
 * @function Header
 **/

const Website = () => {
  const [websiteModal, setWebsiteModal] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  // const [description, setDescription] = useState("");
  const [publicationPrice, setPublicationPrice] = useState("");
  const [devise, setDevice] = useState("");
  const [typeSite, setTypeSite] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productsList, setProductsList] = useState([]);
  // const [editorState, setEditorStateChange] = useState([]);

  const [visitorsPerMonth, setVisitorsPerMounth] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
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
  const onEditorStateChange = (editorState) => {
    console.log("strlength", description.value);
    if (description) setDescription(editorState);
  };
  const addDetails = async (event) => {
    try {
      event.preventDefault();
      event.persist();
      if (userInfo.description.value.length < 50) {
        setError("Required, Add description minimum length 50 characters");
        return;
      }
    } catch (error) {
      throw error;
    }
  };
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("authuser._id", auth.user._id);
    dispatch(getProductsByUserId(auth.user._id));
  }, [auth]);
  const webSite = useSelector((state) => state.product);

  useEffect(() => {
    setProductsList(webSite.products.products);
  }, [webSite]);
  // state cart value
  const cart = useSelector((state) => state.cart);
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const submitwebSiteForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("url", url);
    form.append("publicationPrice", publicationPrice);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("devise", devise);
    form.append("typeSite", typeSite);
    form.append("visitorsPerMonth", visitorsPerMonth);
    let i = 0;
    for (let pic of productPictures) {
      i++;
      if (i < 5) form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => {
      setWebsiteModal(false);
    });
  };
  const handlewebSitePictures = (e) => {
    if (productPictures.length < 5)
      setProductPictures([...productPictures, e.target.files[0]]);
  };
  console.log(webSite);
  const renderwebSites = () => {
    return (
      <Container className="cardItems">
        {webSite.products && webSite
          ? webSite.products.map((site) => {
              console.log(site);
              return (
                <ul class="cards">
                  <li>
                    <a href="" class="card">
                      <img
                        src="https://i.imgur.com/oYiTqum.jpg"
                        class="card__image"
                        alt=""
                      />
                      <div class="card__overlay">
                        <div class="card__header">
                          <svg
                            class="card__arc"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path />
                          </svg>
                          <img
                            class="card__thumb"
                            src={profilePicture}
                            alt=""
                          />
                          <div class="card__header-text">
                            <h3 class="card__title">{site.name}</h3>
                            <span class="card__status">{site.createdAt}</span>
                          </div>
                          <span className="span">
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
                        <p class="card__description">
                          URL:<div>{site.url}</div>
                        </p>
                        <p class="card__description">
                          PRICE OF PUBLIACTION:
                          <div>{site.publicationPrice}</div>
                        </p>
                        <p class="card__description">
                          DEVICE:<div>{site.devise}</div>
                        </p>
                        <p class="card__description">
                          type of site :<div>{site.typeSite}</div>
                        </p>
                        <p class="card__description">
                          visitors per mounth:<div>{site.visitorsPerMonth}</div>
                        </p>
                        <p class="card__description">
                          category:<div>{site.category.name}</div>
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              );
            })
          : null}
      </Container>
    );
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
          style={{ width: "1200px", border: "1px solid white" }}
        >
          <div className="row">
            <div className="rightspace">
              <div className="loginInputContainer">
                <MaterialInput
                  type="text"
                  label="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MaterialInput
                  type="text"
                  label="url site"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div
                  className="form-group col-md-12 editor "
                  style={{
                    marginTop: "20px",
                    border: "2px solid #2874F0",
                    height: "60vh",
                  }}
                >
                  <label className="font-weight-bold">
                    <span
                      className="required"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "#848280",
                      }}
                    >
                      {" "}
                      Description
                    </span>{" "}
                  </label>
                  <Editor
                    style={{ marginTop: "30px" }}
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <textarea
                    style={{ display: "none" }}
                    disabled
                    ref={(val) => (userInfo.description = val)}
                    value={draftToHtml(
                      convertToRaw(description.getCurrentContent())
                    )}
                  />
                </div>

                <MaterialInput
                  type="Number"
                  label="publication Price"
                  value={publicationPrice}
                  onChange={(e) => setPublicationPrice(e.target.value)}
                />
                <MaterialInput
                  type="Number"
                  label="Number of visitors Per Month"
                  value={visitorsPerMonth}
                  onChange={(e) => setVisitorsPerMounth(e.target.value)}
                />
                <br />

                <select
                  className="form-control "
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    border: "1px solid white",
                    borderBottom: "2px solid #2874F0",
                  }}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option>select category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <>
                  <select
                    className="form-control "
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      border: "1px solid white",
                      borderBottom: "2px solid #2874F0",
                    }}
                    value={devise}
                    onChange={(e) => setDevice(e.target.value)}
                  >
                    <option>select device </option>

                    <option value="Usd">Usd</option>
                    <option value="Euro">Euro</option>
                    <option value="Tnd">Tnd</option>
                  </select>
                </>
                <>
                  <select
                    className="form-control "
                    style={{
                      width: "100%",
                      marginTop: "30px",
                      border: "1px solid white",
                      borderBottom: "2px solid #2874F0",
                    }}
                    value={typeSite}
                    onChange={(e) => setTypeSite(e.target.value)}
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
                  className="form-control"
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
