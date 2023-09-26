import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";

const Home = () => {
  let navigate = useNavigate();
  let tokenId = localStorage.getItem("token");
  useEffect(() => {
    if (!tokenId) {
      return navigate("/login");
    }
  }, []);
  return (
    <>
      <Header/>
    </>
  );
};

export default Home;
