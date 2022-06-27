import React, { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { studentDetailAction } from "./actions/studentActions";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "./actions/userActions";

function Navigation() {
  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, error, userInfo } = userLogin;

  const studentDetail = useSelector((state) => state.studentDetail);
  const { student, loading, success } = studentDetail;

  useEffect(() => {
    if (!loading && !success && userInfo) {
      dispatch(studentDetailAction(userInfo._id));
    }
  }, [dispatch, loading, student, success, userInfo]);

 

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">LOGO</Navbar.Brand>
        <Nav className="me-right">
          {userInfo && userInfo.isStudent ? (
            <Nav.Link href="/student-queries">Student Queries</Nav.Link>
          ) : (
            userInfo &&
            userInfo.isTeacher && (
              <Nav.Link href="/teacher-queries">Teacher Queries</Nav.Link>
            )
          )}
          <Nav.Link href="/customer-support">Customer Support</Nav.Link>
          {userInfo ? (
            <Nav.Link onClick={handleLogout}>{userInfo.email}</Nav.Link>
          ) : (
            <Nav.Link href="/">Login</Nav.Link>
          )}

          {student?.length > 0 ? (
            <Nav.Link>credit: {student[0]?.credit}</Nav.Link>
          ) : (
            location?.pathname !== "/" ? (<Nav.Link>credit : 0</Nav.Link>) : null
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
