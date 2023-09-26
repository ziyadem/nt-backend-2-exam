import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AllCourses from "./Pages/AllCourses";
import UserCourses from "./Pages/UserCourses";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/user-courses" element={<UserCourses />} />
      </Routes>
    </>
  );
}

export default App;
