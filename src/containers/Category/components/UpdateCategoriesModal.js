import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";
import { Row, Col } from "react-bootstrap";

const UpdateCategoriesModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    size,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    onSubmit,
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modalTitle={modalTitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded</h6>
        </Col>
      </Row>
      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={`Category Name`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
          </Row>
        ))}
      <h6>Checked Categories</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={`Category Name`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateCategoriesModal;
