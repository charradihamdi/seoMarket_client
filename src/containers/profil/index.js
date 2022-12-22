import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Modal } from "../../components/MaterialUI";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../actions/product.action";
import { updateUser, userInfo } from "../../actions";
import { profilePicture } from "../../components/Header/consPicture";
import "./style.css";
import { Redirect } from "react-router-dom";
import {
  MaterialInput,
  MaterialButton,
  DropdownMenu,
  MaterialSelect,
} from "../../components/MaterialUI";
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
      return;
    }

    dispatch(updateUser(auth.user._id, user)).then(() => {
      setUserUpdate(false);
    });
  };
  const renderUpdateModel = (user) => {
    return (
      <Modal visible={true} onClose={() => setUserUpdate(false)}>
        <div
          className="authContainer"
          style={{ width: "1200px", border: "1px solid white" }}
        >
          <div className="row">
            <div className="rightspace">
              <div className="authContainer">
                <div className="row">
                  <div className="rightspace">
                    <div className="loginInputContainer">
                      <MaterialInput
                        type="number"
                        label="contactNumber"
                        value={user.contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />

                      <MaterialInput
                        type="text"
                        label="country"
                        value={user.country}
                        onChange={(e) => setCountry(e.target.value)}
                      />

                      <br />

                      <>
                        <div
                          style={{
                            left: "0px",
                            border: "1px solid white",
                            display: "flex",
                            justifyContent: "start",
                            marginTop: "20px",
                          }}
                        >
                          <span style={{ fontSize: "12px", color: "red" }}>
                            Enter sexe
                          </span>
                        </div>
                        <select
                          style={{ width: "100%", border: "1px solid white" }}
                          className="form-control mt-5"
                          type="select "
                          label="sexe"
                          placeholder="sexe"
                          value={user.sexe}
                          onChange={(e) => setSexe(e.target.value)}
                        >
                          <option value="">select option</option>
                          <option value="male">male</option>
                          <option value="female">female</option>
                          <option value="other">other</option>
                        </select>
                      </>

                      <>
                        <div
                          style={{
                            left: "0px",
                            border: "1px solid white",
                            display: "flex",
                            justifyContent: "start",
                            marginTop: "20px",
                          }}
                        >
                          Enter Status
                        </div>
                        <select
                          style={{
                            width: "100%",
                            border: "1px solid white",
                          }}
                          className="form-control mt-5"
                          type="select "
                          label="status"
                          placeholder="status"
                          value={user.status}
                          onChange={(e) => setStatut(e.target.value)}
                        >
                          {" "}
                          <option value="">select option</option>
                          <option value="bloggeur">bloggeur</option>
                          <option value="company">company</option>
                          <option value="agency">agency</option>
                          <option value="site owner">site owner</option>
                        </select>
                      </>

                      <MaterialButton
                        title={"Register"}
                        bgColor="#fb641b"
                        textColor="#ffffff"
                        style={{
                          margin: "40px 0 20px 0",
                        }}
                        onClick={userUpdate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <Layout>
      <div className="flexItemsBtn">
        <button onClick={() => setUserUpdate(true)}>update</button>
      </div>
      <div className="desciptionUser">
        <div className="card-container">
          {userduPDATE.user.data ? (
            <span className="pro">{userduPDATE.user.data.statut}</span>
          ) : null}

          <div className="">
            <img src={profilePicture} alt="user" />
          </div>
          <h3 className="textUser">
            Full Name:
            {auth.user.fullName}
          </h3>
          <p className="textUser">
            Email:
            {auth.user.email}
            <br />
          </p>
          {userduPDATE.user.data ? (
            <h3 className="textUser">sexe:{userduPDATE.user.data.sexe}</h3>
          ) : null}
          {userduPDATE.user.data ? (
            <h6 className="textUser">
              country:{userduPDATE.user.data.country}
            </h6>
          ) : null}
          {userduPDATE.user.data ? (
            <h6 className="textUser">
              Phone Number :{userduPDATE.user.data.contactNumber}
            </h6>
          ) : null}
        </div>
        <div>
          {" "}
          <Modal visible={userInfoUpdate} onClose={() => setUserUpdate(false)}>
            <div
              className="authContainer"
              style={{ width: "1200px", border: "1px solid white" }}
            >
              <div className="authContainer">
                <div className="row">
                  <div className="rightspace">
                    <div className="loginInputContainer">
                      <h3 className="headUpdate">Update user </h3>
                      <MaterialInput
                        type="number"
                        label="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />

                      <MaterialInput
                        type="text"
                        label="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />

                      <br />

                      <>
                        <div
                          style={{
                            left: "0px",
                            border: "1px solid white",
                            display: "flex",
                            justifyContent: "start",
                            marginTop: "20px",
                          }}
                        >
                          <span
                            style={{ fontSize: "12px", marginBottom: "16px" }}
                          >
                            Enter sexe
                          </span>
                        </div>
                        <select
                          style={{ width: "100%", border: "1px solid white" }}
                          className="form-control mt-5"
                          type="select "
                          label="sexe"
                          placeholder="sexe"
                          value={sexe}
                          onChange={(e) => setSexe(e.target.value)}
                        >
                          <option value="">select option</option>
                          <option value="male">male</option>
                          <option value="female">female</option>
                          <option value="other">other</option>
                        </select>
                      </>

                      <>
                        <div
                          style={{
                            left: "0px",
                            border: "1px solid white",
                            display: "flex",
                            justifyContent: "start",
                            marginTop: "20px",
                          }}
                        >
                          <span
                            style={{ fontSize: "12px", marginBottom: "16px" }}
                          >
                            Enter Status
                          </span>
                        </div>
                        <select
                          style={{
                            width: "100%",
                            border: "1px solid white",
                          }}
                          className="form-control mt-5"
                          type="select "
                          label="status"
                          placeholder="status"
                          value={statut}
                          onChange={(e) => setStatut(e.target.value)}
                        >
                          {" "}
                          <option value="">select option</option>
                          <option value="bloggeur">bloggeur</option>
                          <option value="company">company</option>
                          <option value="agency">agency</option>
                          <option value="site owner">site owner</option>
                        </select>
                      </>

                      <MaterialButton
                        title={"Submit"}
                        bgColor="#fb641b"
                        textColor="#ffffff"
                        style={{
                          margin: "40px 0 20px 0",
                        }}
                        onClick={userUpdate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Profil;
