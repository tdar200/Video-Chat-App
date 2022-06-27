import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";

const LoginScreen = ({}) => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  // const redirect = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  console.log("navigate", navigate.search);

  // let redirect

  console.log(userInfo);
  // console.log("redirect", redirect);

  // redirect.current = navigate.search
  //   ? navigate.search.split("=")[1]
  //   : userInfo.isTeacher
  //   ? "/teacher-queries"
  //   : userInfo.isStudent && "/student-queries";

  useEffect(() => {
    if (userInfo && userInfo.isTeacher) {
      navigate("/teacher-queries");
    } else if (userInfo && userInfo.isStudent) {
      navigate("/student-queries");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          {userInfo ? (
            <Link
              to={
                userInfo && userInfo.isStudent !== null
                  ? `/register?redirect=student-queries`
                  : userInfo.isTeacher !== null &&
                    `/register?redirect=teacher-queries`
              }
            >
              Register
            </Link>
          ) : (
            <Link to={"/register"}>Register</Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
