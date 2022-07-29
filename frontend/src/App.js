import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Tuition from "./Tuition";
import CustomerSupport from "./pages/CustomerSupport";
import QueryDetailsPage from "./pages/QueryDetailsPage";
import CreateQuery from "./pages/CreateQuery";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import TeacherRegisterPage from "./pages/TeacherRegisterPage";
import SignupUser from "./pages/SignupUser";
import TeacherQuery from "./pages/TeacherQuery";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<LoginScreen />}></Route>
          <Route path='/register' element={<SignupUser />}></Route>
          <Route
            path='/student-register'
            element={<StudentRegisterPage />}></Route>

          <Route
            path='/teacher-register'
            element={<TeacherRegisterPage />}></Route>
          <Route path='/student-queries' element={<CreateQuery />}></Route>
          <Route path='/teacher-queries' element={<TeacherQuery />}></Route>
          <Route path='/customer-support' element={<CustomerSupport />}></Route>
          <Route path='/rooms/:id' element={<QueryDetailsPage />}></Route>
          <Route path='/appointments/:id' element={<Appointments />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
