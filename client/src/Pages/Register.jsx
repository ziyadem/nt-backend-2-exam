import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Register = () => {
  let navigate = useNavigate();
  let tokenId = localStorage.getItem("token");
  useEffect(() => {
    if (tokenId) {
      navigate("/login");
    }
  }, []);
  const getUserInfo = async (e) => {
    e.preventDefault();
    
    await fetch("http://localhost:7777/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: new FormData(formElm),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data) {
        //   return toast(data.msg, { type: "error" });
        // }
        toast(data.msg, { type: "success" });
        console.log(data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  return (
    <>
      <div className="maxDiv">
        <form onSubmit={(e) => getUserInfo(e)} id="formElm">
          <h2>Register</h2>
          <div className="form-group">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              id="username"
              required
              min={3}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Your email"
              id="email"
              required
              min={3}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="confirmEmail"
              className="form-control"
              placeholder="Confirm email"
              id="confirmEmail"
              required
              min={3}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="password"
              id="pwd"
              required
              min={3}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              name="userimg"
              className="form-control"
              id="userimg"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            register
          </button>
          <Link
            to="/login"
            className="text-light p-4 text-decoration-underline"
          >
            Log In
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
