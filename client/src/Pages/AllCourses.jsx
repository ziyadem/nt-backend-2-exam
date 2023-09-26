import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
const AllCourses = () => {
  let navigate = useNavigate();
  let [course, useCourse] = useState([]);
  let tokenId = localStorage.getItem("token");
  useEffect( () => {
    // if (!tokenId) {
    //   navigate("/login");
    // }
    async function fetchData() {
      await fetch("http://localhost:7777/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then((res) => res.json())
        .then((data) => {
         console.log(data.msg);
         useCourse(data.data)
        })
        .catch((err) => {
          console.log(err.msg);
        });
    }
    fetchData();

  }, []);

  return (
    <>
      <Header />
      <section className="container courses">
        <h2 className="text-center pt-3 pb-3 fs-1">All Courses</h2>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>title</th>
              <th>price</th>
              <th>author</th>
            </tr>
          </thead>
          <tbody>
            {course &&
              course.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.price}</td>
              <td>{c.author}</td>
            </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AllCourses;
