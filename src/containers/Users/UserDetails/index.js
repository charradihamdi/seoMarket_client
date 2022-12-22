import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../components/UI/Modal";
import ReactHtmlParser from "react-html-parser";
import {
  addProduct,
  deleteProductById,
  activateProduct,
  getProducts,
  getInitialData,
  getProductsByUserId,
} from "../../../actions";
import { Link } from "react-router-dom";
const UserDetails = (props) => {
  const [websiteDetails, setwebsiteDetails] = useState(null);
  const [webSiteDetailModal, setWebsiteDetailModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialData());
  }, []);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getProductsByUserId(id));
  }, []);
  const webSite = useSelector((state) => state.product);

  const handleClosewebsiteDetailsModal = () => {
    setWebsiteDetailModal(false);
  };
  const showebsiteDetailsModal = (webSite) => {
    setwebsiteDetails(webSite);
    setWebsiteDetailModal(true);
  };
  const renderwebsiteDetailsModal = () => {
    if (!websiteDetails) {
      return null;
    }

    return (
      <Modal
        show={webSiteDetailModal}
        handleClose={handleClosewebsiteDetailsModal}
        modalTitle={"website Details"}
        size="lg"
      >
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
            <label className="key">Category</label>
            <p className="value">{websiteDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Url:</label>
            <p className="value">{websiteDetails.url}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Description</label>
            <p className="value">
              {ReactHtmlParser(websiteDetails.description)}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {websiteDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={`http://localhost:5000${picture.img}`} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  const renderwebSites = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>url</th>
            <th>devise</th>
            <th>typeSite</th>
            <th>visitorsPerMonth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {webSite && webSite.products.length > 0
            ? webSite.products.map((webSite) => (
                <tr key={webSite._id}>
                  <td>2</td>
                  <td>{webSite.name}</td>
                  <td>{webSite.url}</td>
                  <td>{webSite.devise}</td>
                  <td>{webSite.typeSite}</td>
                  <td>{webSite.visitorsPerMonth}</td>

                  <td>
                    <Link to={`/websites/${webSite._id}`}>
                      <button>info</button>
                    </Link>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: webSite._id,
                        };
                        dispatch(deleteProductById(payload));
                        dispatch(getProducts());
                        dispatch(getInitialData());
                      }}
                    >
                      del
                    </button>
                    {!webSite.isActive ? (
                      <button
                        onClick={() => {
                          dispatch(activateProduct(webSite._id));
                          dispatch(getProducts());
                          dispatch(getInitialData());
                        }}
                      >
                        {"activate"}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };
  return (
    <Layout sidebar>
      <Container style={{ marginTop: "px" }}>
        <span style={{ fontSize: "12px" }}>
          <Link to="/">Home/ </Link> <Link to="/users">Users/ </Link>Details
        </span>
        <br />
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Websites</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderwebSites()}</Col>
        </Row>
      </Container>
      {renderwebsiteDetailsModal()}
    </Layout>
  );
};

export default UserDetails;
