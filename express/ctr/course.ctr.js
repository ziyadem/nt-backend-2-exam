const path = require("path");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readF, writeF } = require("../fs/fs.js");
let users = readF("users.json");
let courses = readF("courses.json");
let uploadCours = readF("uploadCours.json");

//get all course
const getAllCourse=(req,res)=>{
    res.send({
        msg : "get All",
        data:courses
    })
}

//get user course
const getUserCourse=async(req,res)=>{
    try {
        let {id:token} = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
        let foundedCourses=courses.filter(c=>c.user_id===token)
        res.json({msg:"get user courses",data:foundedCourses})
    } catch (error) {
        res.json({msg:error.message})
    }  
}

//create course
const createCourse =async (req, res) => {
    let fileUp = req.files?.coursimg;
    let name = uuid.v4() + path.extname(fileUp.name);
    try {
        let {id:token} = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
        let cours=req.body;
        let k= courses.find((c) => c.title == cours.title && c.price == cours.price);
        if(k){return res.json({ msg: "the course is already exsise" });}
        cours.user_id=token;
        cours.id=uuid.v4();
        cours.cours_img =name;
        fileUp.mv("db/files/course/" + name, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          let img = {
            name,
            url:"course/"+name,
          };
          uploadCours.push(img);
          writeF("uploadCours.json", uploadCours);
        });
        courses.push(cours);
        writeF("courses.json",courses)
        res.json({ msg: "Create course"});
    } catch (error) {
        res.json({msg: error.message})
    }
  
};

//updaate course
const updateCourse=async(req,res)=>{
  let fileUp = req.files?.coursimg;
  let name = uuid.v4() + path.extname(fileUp.name);
      try {
    const { id } = req.params
    let {id:token} = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
    let tokenCourse = courses.filter((c) => c.user_id === token);
    let foundedCourse = tokenCourse.find((c) => c.id === id);

    if(!foundedCourse) return res.status(400).send({ msg: 'Course not found!' })
    let {title,price,author}=req.body
    courses.forEach((course) => {
        console.log(course);
        if(course.id === id){
             course.title = title ? title : course.title;
             course.price = price ? price : course.price;
             course.author = author ? author : course.author;
            if(name){
              course.cours_img=name
            }
        }
    })
     fileUp.mv("db/files/course/" + name, (err) => {
       if (err) {
         return res.status(500).send(err);
       }
       let img = {
         name,
         url: "course/" + name,
       };
       uploadCours.push(img);
       writeF("uploadCours.json", uploadCours);
     });

    writeF("courses.json", courses)
    
   return res.send(JSON.stringify({
        msg: 'update!'
    }));
  } catch (error) {
    res.json({msg:error.message})
  }
}

//delete course
const deleteCourse =async (req, res) => {
  try {
    const { id } = req.params
    let {id:token} = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
    let tokenCourse = courses.filter((c) => c.user_id === token);
    let foundedCourse = tokenCourse.find((c) => c.id === id);

    if(!foundedCourse) return res.status(400).send({ msg: 'Course not found!' })

    courses.forEach((course, idx) => {
        if(course.id === id){
            courses.splice(idx, 1)
        }
    })

    writeF("courses.json", courses)
    
   return res.send(JSON.stringify({
        msg: 'Deleted!'
    }));
  } catch (error) {
    res.json({msg:error.message})
  }
};


module.exports = {
  getAllCourse,
  getUserCourse,
  updateCourse,
  deleteCourse,
  createCourse,
};
