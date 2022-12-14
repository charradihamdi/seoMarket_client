import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../actions/product.action";
import { profilePicture } from "../../components/Header/consPicture";
import "./style.css";
import { Redirect } from "react-router-dom";

const Profil = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [webSitePictures, setwebSitePictures] = useState([]);
  const [show, setShow] = useState(false);
  const [webSiteDetailModal, setWebsiteDetailModal] = useState(false);
  const [websiteDetails, setwebsiteDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const webSite = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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

  return (
    <Layout>
      <Container className="profile_container">
        <Row className="profileRow">
          <Col md="6" className="colprofile">
            <img
              src={profilePicture}
              alt="profile"
              className="profilePricture"
              style={{ height: "180px", width: "180px" }}
            />
          </Col>
          <Col md="6" className="userInfo">
            <Col md="6">
              <label className="key">firstName</label>
              <p className="value">{auth.user.firstName ?? ""}</p>
            </Col>
            <Col md="6">
              <label className="key">lastName</label>
              <p className="value">{auth.user.lastName ?? ""}</p>
            </Col>
            <Col md="6">
              <label className="key">email</label>
              <p className="value">{auth.user.email ?? ""}</p>
            </Col>
            <Col md="6">
              <label className="key">Country</label>
              <p className="value">{auth.user.country ?? "tunis"}</p>
            </Col>
            <Col md="6">
              <label className="key">Sexe</label>
              <p className="value">{auth.user.sexe ?? "F"}</p>
            </Col>
            <Col md="6">
              <label className="key">Statut </label>
              <p className="value">{auth.user.statut ?? "blogger"}</p>
            </Col>
            <Col md="6">
              <label className="key">contact number </label>
              <p className="value">{auth.user.contactNumber ?? "4"}</p>
            </Col>
            <Col md="6">
              <label className="key">number of site created</label>
              <p className="value">{"4"}</p>
            </Col>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Profil;
