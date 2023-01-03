import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../actions/product.action";
import { updateUser, userInfo } from "../../actions";
import { profilePicture } from "../../components/Header/consPicture";
import "./style.css";
import { signout } from "../../actions";
const Profil = () => {
  const [userInfoUpdate, setUserUpdate] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [price, setPrice] = useState("");
  const [sexe, setSexe] = useState("");
  const [statut, setStatut] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [webSitePictures, setwebSitePictures] = useState([]);
  const [show, setShow] = useState(false);
  const [webSiteDetailModal, setWebsiteDetailModal] = useState(false);
  const [websiteDetails, setwebsiteDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const webSite = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const userduPDATE = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo(auth.user._id));
  }, [auth]);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const submitwebSiteForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of webSitePictures) {
      form.append("webSitePicture", pic);
    }
    dispatch(addProduct(form)).then(() => setShow(false));
  };

  const userUpdate = () => {
    const user = {
      sexe,
      contactNumber,
      country,
      statut,
    };
    if (sexe === "" || country === "" || contactNumber === 0 || statut === "") {
      alert("Please complete and submit your information");
      return;
    }

    dispatch(updateUser(auth.user._id, user)).then(() => {
      setUserUpdate(false);
      setSexe("");
      setContactNumber("");
      setCountry("");
      setStatut("");
    });
  };

  return (
    <Layout>
      <>
        <section className="gray-bg pt-4" style={{ marginTop: "120px" }}>
          <div className="container-fluid">
            <div className="row m-0">
              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                <div className="dashboard-navbar overlio-top">
                  <div className="d-user-avater">
                    <img
                      src={profilePicture}
                      className="img-fluid rounded"
                      alt=""
                    />
                    <h4>{auth.user.fullName}</h4>
                    <span>
                      {" "}
                      {userduPDATE.user.data ? (
                        <label>{userduPDATE.user.data.country}</label>
                      ) : null}
                    </span>
                  </div>

                  <div className="d-navigation">
                    <ul id="metismenu">
                      <li>
                        <a href="/website">
                          <i className="ti-dashboard"></i>Dashboard
                        </a>
                      </li>
                      <li className="active">
                        <a href="/profil">
                          <i className="ti-user"></i>My Profile
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
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="bredcrumb_wrap">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>

                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            My Profile
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="_dashboard_content">
                      <div className="_dashboard_content_header">
                        <div className="_dashboard__header_flex">
                          <h4>
                            <i className="fa fa-user mr-1"></i>My Account
                          </h4>
                        </div>
                      </div>

                      <div className="_dashboard_content_body">
                        <div className="row">
                          <div className="col-auto">
                            <div className="custom-file avater_uploads">
                              <label
                                className="custom-file-label"
                                for="customFile"
                              >
                                <i className="fa fa-user"></i>
                              </label>
                            </div>
                          </div>

                          <div className="col">
                            <div className="row">
                              <div className="col-xl-6 col-lg-6">
                                <div className="form-group">
                                  <label>First Name:</label>
                                  <label>{auth.user.firstName}</label>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                <div className="form-group">
                                  <label>Last Name:</label>
                                  <label>{auth.user.lastName}</label>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                <div className="form-group">
                                  <label>contact Number:</label>
                                  {userduPDATE.user.data ? (
                                    <label>
                                      {userduPDATE.user.data.contactNumber}
                                    </label>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                <div className="form-group">
                                  <label>Email:</label>
                                  <label>{auth.user.email}</label>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                <div className="form-group">
                                  <label>Sexe:</label>
                                  {userduPDATE.user.data ? (
                                    <label>{userduPDATE.user.data.sexe}</label>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6">
                                <div className="form-group">
                                  <label>Status:</label>
                                  {userduPDATE.user.data ? (
                                    <label>
                                      {userduPDATE.user.data.statut}
                                    </label>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="_dashboard_content">
                      <div className="_dashboard_content_header">
                        <div className="_dashboard__header_flex">
                          <h4>
                            <i className="ti-lock-open mr-1"></i>Set profitional
                            information
                          </h4>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="form-group with-light">
                          <label>Status</label>
                          <select
                            id="country"
                            className="form-control "
                            type="select "
                            label="status"
                            placeholder="status"
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                          >
                            <option value="">select State</option>
                            <option value="bloggeur">bloggeur</option>
                            <option value="company">company</option>
                            <option value="agency">agency</option>
                            <option value="site owner">site owner</option>
                          </select>
                        </div>
                        <div className="form-group with-light">
                          <label>sexe</label>
                          <select
                            id="country"
                            className="form-control "
                            type="select "
                            label="sexe"
                            placeholder="sexe"
                            value={sexe}
                            onChange={(e) => setSexe(e.target.value)}
                          >
                            <option value="">select sexe</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                          </select>
                        </div>
                      </div>
                      <div className="_dashboard_content_body">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4">
                            <div className="form-group">
                              <label>contact Number</label>
                              <input
                                type="number"
                                label="contactNumber"
                                value={contactNumber}
                                onChange={(e) =>
                                  setContactNumber(e.target.value)
                                }
                                className="form-control with-light"
                              />
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4">
                            <div className="form-group">
                              <label>country</label>
                              <input
                                type="text"
                                label="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="form-control with-light"
                              />
                            </div>
                          </div>

                          <div className="col-xl-12 col-lg-12">
                            <div className="form-group">
                              <input
                                id="sec"
                                className="checkbox-custom"
                                name="Security"
                                type="checkbox"
                              />
                              <label
                                for="sec"
                                className="checkbox-custom-label"
                              >
                                Enable Verification via Phone
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-save"
                      onClick={userUpdate}
                    >
                      Save Changes
                    </button>
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

export default Profil;
