
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../Components/Header'
import { toast } from "react-toastify";

const UserCourses = () => {
  let navigate = useNavigate();
  let [course, useCourse] = useState([]);
   let [del, useDel] = useState(0);
  let tokenId = localStorage.getItem("token");

 const deleteCourse = async (course_id) => {
   await fetch(`http://localhost:7777/course/${course_id}`, {
     method: "DELETE",
     headers: {
       "Copntent-Type": "application/json",
       token: localStorage.getItem("token"),
     },
   })
     .then((res) => res.json())
     .then((data) => {
       useDel(Math.random() * (1000 - 1) + 1);
       console.log(Math.random() * (1000 - 1) + 1);
       toast(data.msg, { type: "success" });
     })
     .catch((err) => console.log(err));
 };
 const updateCourse = async (e) => {
   e.preventDefault();
   let { title, price } = e.target;
   await fetch(`http://localhost:7777/course/${upd.id}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       token: localStorage.getItem("token"),
     },
     body: JSON.stringify({
       title: title.value,
       price: price.value,
       author: author.value,
     }),
   })
     .then((res) => res.json())
     .then((data) => {
       if (data.msg !== "update!") {
         return toast(data.msg, { type: "error" });
       }
       toast(data.msg, { type: "success" });
       useDel(Math.random() * (1000 - 1) + 1);
       console.log(Math.random() * (1000 - 1) + 1);
       title.value = "";
       price.value = "";
       author.value = "";
     })
     .catch((err) => console.log(err));
 };

  useEffect(() => {
    // if (!tokenId) {
    //   navigate("/login");
    // }
    async function fetchData() {
      await fetch("http://localhost:7777/course", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.msg);
          useCourse(data.data);
        })
        .catch((err) => {
          console.log(err.msg);
        });
    }
    fetchData();
  }, []);
 

console.log(course);
  return (
    <>
      <Header />
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update Course
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form >
              <div class="modal-body">
                <div>
                  <label htmlFor="title">Title: </label> <br />
                  <input
                    type="text"
                    name="title"
                    id="title"
                  />
                </div>
                <div>
                  <label htmlFor="price">Price:</label> <br />
                  <input
                    type="text"
                    name="price"
                    id="price"
                  
                  />
                </div>
                <div>
                  <label htmlFor="price">Author:</label> <br />
                  <input
                    type="author"
                    name="author"
                    id="author"
                  
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Create Course
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form >
              <div class="modal-body">
                <div>
                  <label htmlFor="title">Title: </label> <br />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    
                  />
                </div>
                <div>
                  <label htmlFor="price">Price:</label> <br />
                  <input
                    type="text"
                    name="price"
                    id="price"
                  
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Understood
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <section className="container courses">
        <h2 className="text-center pt-3 pb-3 fs-1">User Courses</h2>
        <div className="create-course">
          <button
            className="btn btn-danger "
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Create course
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>title</th>
              <th>price</th>
              <th>author</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {course &&
              course.map((c) => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td>{c.price}</td>
                  <td>{c.author}</td>
                  <td>
                    <i
                      className="fa fa-edit text-primary me-3"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    ></i>
                    <i
                      className="fa fa-trash text-danger "
                      style={{ cursor: "pointer" }}
                      onClick={()=>{deleteCourse(c.id)}}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default UserCourses
