const express = require("express");

//ctr
const { getAllCourse,getUserCourse,updateCourse,deleteCourse,createCourse } = require("../ctr/course.ctr.js");

//meddleware
const { courseValidate,updateCourseValidate} =require("../meddleware/course.midle.js")

const router = express.Router();

router.route("/courses").get(getAllCourse);

router
  .route("/course/:id")
  .delete(deleteCourse)
  .put(updateCourseValidate, updateCourse);
  
router.route("/course").get(getUserCourse).post(courseValidate, createCourse);

module.exports = router;
