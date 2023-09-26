import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  function handleRegister() {
    localStorage.clear("token");
    navigate("/register");
  }
  function handleLogin() {
    localStorage.clear("token");
    navigate("/login");
  }
  return (
    <header>
      <nav className="container">
        <Link to="/">
          <img src="/logo.jpg" alt="logo" />
        </Link>

        <ul>
          <li>
            <Link to="/all-courses" className="text-decoration-none fs-5">
              all-courses
            </Link>
          </li>
          <li>
            <Link to="/user-courses" className="text-decoration-none fs-5">
              user-course
            </Link>
          </li>
        </ul>
        <div>
          <button className="btn btn-primary" onClick={handleRegister}>
            Create Acount
          </button>
          <button className="btn btn-primary" onClick={handleLogin}>
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
