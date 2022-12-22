import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import Modal from "../../../components/UI/Modal";
import axios from "axios";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Detailswebsite(props) {
  const [descriptionValueOne, setDescriptionValueOne] = useState({});
  const [websiteDetails, setWebsiteDetails] = useState([]);
  const [getdata, setGetDate] = useState(true);
  const [webSiteDetailModal, setWebsiteDetailModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const category = useSelector((state) => state.category);
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
    }
    return options;
  };
  if (getdata) {
    axios({
      method: "get",
      url: `http://localhost:5000/api/product/${props.match.params.siteId}`,
    })
      .then((res) => {
        setWebsiteDetails(res.data.product);
        setDescriptionValueOne(res.data.product.description);
      })
      .catch((err) => {
        console.log(err);
      });
    setGetDate(false);
  }

  const handleUpdate = () => {
    let id = websiteDetails._id;
    if (descriptionValueOne.length > 5000) {
      alert("maximum description length 5000 char");
    } else if (categoryId == "") {
      alert("category required");
    } else {
      console.log(descriptionValueOne);
      axios({
        method: "put",
        url: `http://localhost:5000/api/products/product/update`,
        data: { descriptionValueOne, categoryId, id },
      }).then((res) => {
        setWebsiteDetailModal(false);
        window.location = "/websites/" + id;
      });
    }
  };

  const handleClosewebsiteDetailsModal = () => {
    setWebsiteDetailModal(false);
  };

  const updateDescription = () => {
    return (
      <Modal
        show={webSiteDetailModal}
        handleClose={handleClosewebsiteDetailsModal}
        modalTitle={"update description site "}
        size="lg"
      >
        <form>
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
          <div
            className="form-group col-md-12 editor "
            style={{
              marginTop: "20px",
              border: "2px solid #2874F0",
              height: "60vh",
            }}
          >
            <div className="form-group col-md-12 ">
              <label className="font-weight-bold">
                {" "}
                Additional Information{" "}
              </label>
              <EditorToolbar toolbarId={"t2"} />
              <ReactQuill
                className="scroll"
                theme="snow"
                value={descriptionValueOne}
                onChange={(e) => {
                  setDescriptionValueOne(e);
                }}
                placeholder={"Write something awesome..."}
                modules={modules("t2")}
                formats={formats}
              />
            </div>
          </div>
        </form>
        <button className="form-control btn-danger" onClick={handleUpdate}>
          Update description
        </button>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container size="lg">
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{websiteDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">publication Price</label>
            <p className="value">{websiteDetails.publicationPrice}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">number of visitors per mounth</label>
            <p className="value">{websiteDetails.visitorsPerMonth}</p>
          </Col>
          <Col md="6">
            <label className="key">created at </label>
            <p className="value">{websiteDetails.createdAt}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">type of Site</label>
            <p className="value">{websiteDetails.typeSite}</p>
          </Col>
          <Col md="6">
            <label className="key">devise</label>
            <p className="value">{websiteDetails.devise}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">URL</label>
            <a href={websiteDetails.url}>
              <p
                className="value"
                onClick={() => {
                  window.location.href = websiteDetails.url;
                }}
              >
                {websiteDetails.url}
              </p>
            </a>
          </Col>
          <Col md="6">
            <label className="key">category</label>
            <p className="value">
              {websiteDetails.category && websiteDetails
                ? websiteDetails.category.name
                : "not active"}
            </p>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            className="btn btn-danger"
            onClick={() => setWebsiteDetailModal(true)}
          >
            update
          </button>
        </div>
        <Row>
          <label className="key">Description:</label>
          <Col md="12 d-flex justify-content-space-between">
            <p className="value">
              {ReactHtmlParser(websiteDetails.description)}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {websiteDetails && websiteDetails.productPictures
                ? websiteDetails.productPictures.map((picture) => (
                    <div className="productImgContainer">
                      <img src={`http://localhost:5000${picture.img}`} alt="" />
                    </div>
                  ))
                : null}
            </div>
          </Col>
          {updateDescription()}
        </Row>
      </Container>
    </Layout>
  );
}

export default Detailswebsite;
