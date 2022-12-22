import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import {
  addProduct,
  deleteProductById,
  activateProduct,
  getProducts,
  getInitialData,
} from "../../actions";
import "./style.css";
import { Link } from "react-router-dom";

/**
 * @author
 * @function webSites
 **/

const Websites = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [webSitePictures, setwebSitePictures] = useState([]);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const [webSiteDetailModal, setWebsiteDetailModal] = useState(false);
  const [websiteDetails, setwebsiteDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const webSite = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    dispatch(getInitialData());
  }, []);
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

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handlewebSitePictures = (e) => {
    setwebSitePictures([...webSitePictures, e.target.files[0]]);
  };
  function RnderCategoryName(id) {
    category.categories.map((elm) => {
      if (elm._id == id) {
        return elm.name;
      }
    });
  }
  if (webSite.products[0]) {
    webSite.products = webSite.products.sort(function (a, b) {
      let site1 = Date.parse(a.createdAt);
      let site2 = Date.parse(b.createdAt);

      return site2 - site1;
    });
  }
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
            <th>price</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {webSite.products.length > 0
            ? webSite.products.map((webSite) => (
                <tr key={webSite._id}>
                  <td>2</td>
                  <td>{webSite.name}</td>
                  <td>{webSite.url}</td>
                  <td>{webSite.devise}</td>
                  <td>{webSite.typeSite}</td>
                  <td>{webSite.visitorsPerMonth}</td>
                  <td>{webSite.publicationPrice}</td>

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
                      }}
                    >
                      del
                    </button>
                    {!webSite.isActive ? (
                      <button
                        onClick={() => {
                          dispatch(activateProduct(webSite._id));
                          dispatch(getProducts());
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
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{parse(websiteDetails.description)}</p>
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
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Website</h3>
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

export default Websites;

// 242 <button onClick={handleShow}>Add</button>
