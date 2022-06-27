import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createQuery, getQueryDetails } from "../actions/queryActions";
import { useNavigate } from "react-router-dom";

function ModalComponent(props) {
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const queryCreate = useSelector((state) => state.queryCreate);
  const { queries } = queryCreate;

  useEffect(() => {
    if (queries ) {
      dispatch(getQueryDetails(queries._id));
      window.location.reload();
    }
  }, [dispatch, queries, ]);

  function handleSubmit(e) {
    e.preventDefault();

    const values = {
      email: userInfo.email,
      category,
      subCategory,
      query,
    };
    dispatch(createQuery(values));
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label>Category</Form.Label>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                {category ? category : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setCategory("Tech")}>
                  Tech
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCategory("Accounting")}>
                  Accounting
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCategory("Marketing")}>
                  Marketing
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Sub Category</Form.Label>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                {subCategory ? subCategory : "Sub Category"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSubCategory("Tech")}>
                  Tech
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSubCategory("Accounting")}>
                  Accounting
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSubCategory("Marketing")}>
                  Marketing
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputQuery">Question</Form.Label>
            <Form.Control
              onChange={(e) => setQuery(e.target.value)}
              id="inputQuery"
              aria-describedby="questionHelpBlock"
            />
            <Form.Text
              // onChange={(e) => setQuery(e.target.value)}
              id="questionHelpBlock"
            ></Form.Text>
          </Form.Group>

          <Button variant="success" className="float-end" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
