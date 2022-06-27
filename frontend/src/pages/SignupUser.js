import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignupUser() {
  const navigate = useNavigate();

  const handleTeacherSubmit = () => {
    navigate("/teacher-register");
  };

  const handleStudentSubmit = () => {
    navigate("/student-register");
  };

  return (
    <Container>
      <Button onClick={handleTeacherSubmit}>Teacher</Button>
      <Button onClick={handleStudentSubmit}>Student</Button>
    </Container>
  );
}

export default SignupUser;
