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
        <section class="gray-bg pt-4" style={{ marginTop: "120px" }}>
          <div class="container-fluid">
            <div class="row m-0">
              <div class="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                <div class="dashboard-navbar overlio-top">
                  <div class="d-user-avater">
                    <img
                      src={profilePicture}
                      class="img-fluid rounded"
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

                  <div class="d-navigation">
                    <ul id="metismenu">
                      <li>
                        <a href="/website">
                          <i class="ti-dashboard"></i>Dashboard
                        </a>
                      </li>
                      <li class="active">
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

              <div class="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="bredcrumb_wrap">
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item">
                            <a href="#">Home</a>
                          </li>

                          <li
                            class="breadcrumb-item active"
                            aria-current="page"
                          >
                            My Profile
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="_dashboard_content">
                      <div class="_dashboard_content_header">
                        <div class="_dashboard__header_flex">
                          <h4>
                            <i class="fa fa-user mr-1"></i>My Account
                          </h4>
                        </div>
                      </div>

                      <div class="_dashboard_content_body">
                        <div class="row">
                          <div class="col-auto">
                            <div class="custom-file avater_uploads">
                              <label class="custom-file-label" for="customFile">
                                <i class="fa fa-user"></i>
                              </label>
                            </div>
                          </div>

                          <div class="col">
                            <div class="row">
                              <div class="col-xl-6 col-lg-6">
                                <div class="form-group">
                                  <label>First Name:</label>
                                  <label>{auth.user.firstName}</label>
                                </div>
                              </div>
                              <div class="col-xl-6 col-lg-6">
                                <div class="form-group">
                                  <label>Last Name:</label>
                                  <label>{auth.user.lastName}</label>
                                </div>
                              </div>
                              <div class="col-xl-6 col-lg-6">
                                <div class="form-group">
                                  <label>contact Number:</label>
                                  {userduPDATE.user.data ? (
                                    <label>
                                      {userduPDATE.user.data.contactNumber}
                                    </label>
                                  ) : null}
                                </div>
                              </div>
                              <div class="col-xl-6 col-lg-6">
                                <div class="form-group">
                                  <label>Email:</label>
                                  <label>{auth.user.email}</label>
                                </div>
                              </div>
                              <div class="col-xl-6 col-lg-6">
                                <div class="form-group">
                                  <label>Sexe:</label>
                                  {userduPDATE.user.data ? (
                                    <label>{userduPDATE.user.data.sexe}</label>
                                  ) : null}
                                </div>
                              </div>
                              <div class="col-xl-6 col-lg-6">
                                <div class="form-group">
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
                    <div class="_dashboard_content">
                      <div class="_dashboard_content_header">
                        <div class="_dashboard__header_flex">
                          <h4>
                            <i class="ti-lock-open mr-1"></i>Set profitional
                            information
                          </h4>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6">
                        <div class="form-group with-light">
                          <label>Status</label>
                          <select
                            id="country"
                            class="form-control "
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
                        <div class="form-group with-light">
                          <label>sexe</label>
                          <select
                            id="country"
                            class="form-control "
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
                      <div class="_dashboard_content_body">
                        <div class="row">
                          <div class="col-xl-4 col-lg-4">
                            <div class="form-group">
                              <label>contact Number</label>
                              <input
                                type="number"
                                label="contactNumber"
                                value={contactNumber}
                                onChange={(e) =>
                                  setContactNumber(e.target.value)
                                }
                                class="form-control with-light"
                              />
                            </div>
                          </div>
                          <div class="col-xl-4 col-lg-4">
                            <div class="form-group">
                              <label>country</label>
                              <input
                                type="text"
                                label="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                class="form-control with-light"
                              />
                            </div>
                          </div>

                          <div class="col-xl-12 col-lg-12">
                            <div class="form-group">
                              <input
                                id="sec"
                                class="checkbox-custom"
                                name="Security"
                                type="checkbox"
                              />
                              <label for="sec" class="checkbox-custom-label">
                                Enable Verification via Phone
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-save"
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
