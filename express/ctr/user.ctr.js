const path=require("path");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readF, writeF } = require("../fs/fs.js");
let users = readF("users.json");
let upload = readF("upload.json");

//REGISTER
const register = (req, res) => {
  let fileUp = req.files?.userimg;
  let userId = uuid.v4();
  let name = uuid.v4() + path.extname(fileUp.name);
  const { username, email, confirmEmail, password } = req.body;

  //register validate
  if(email !== confirmEmail ){return res.send({ msg: "email and confirmEmail are not equal" })}
  let foundedUser = users.find((e) => e.email === email || e.username === username);
  if (foundedUser) return res.status(400).send(JSON.stringify({msg: "User already exists!!",}));

  const hashPsw = bcrypt.hashSync(password, 12);

  //img upload
  fileUp.mv("db/files/users/" + name, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    let img = {
      name,
      url:"users/"+name,
    };
    upload.push(img);
    writeF("upload.json", upload);
  });

  //new user
    let user = {
      id: userId,
      username,
      email,
      userImg:name,
      password: hashPsw,
    };
    users.push(user);
    writeF("users.json", users);

  return res.status(201).send({
    msg: "User registrated!",
  });
};

//LOGIN
const login = async (req, res) => {
  const { supername, password } = req.body;

  //login validation
  let foundedUser = users.find(
    (e) => e.email == supername || e.username == supername
  );
  console.log(users);
  if (!foundedUser)
    return res.status(404).send({ msg: "User not found!" });
  let checkPsw = await bcrypt.compare(password, foundedUser.password);
  
  //get token
  if (checkPsw) {
    let token = await jwt.sign({ id: foundedUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).send({msg: "loged!!!", token });
  }
  //res send
  return res.status(401).send({ msg: "Password invated!" });
};


//update user
const updateUser = async(req, res) => {
  const { username, email, password } = req.body;
  let fileUp = req.files?.userimg;
  let name = uuid.v4() + path.extname(fileUp.name);
  let {id:token} = await jwt.verify(req.headers.token, process.env.SECRET_KEY);
  let tokenUser = users.filter((c) => c.id === token);

  if (!tokenUser) return res.status(404).send({ msg: "Course not found!" });
  let hashPsw=password;
  if(password){hashPsw = bcrypt.hashSync(password, 12)}
  console.log(hashPsw);
  users.forEach((a, idx) => {
    if (a.id === token) {
      a.username = username ? username : a.username;
      a.email = email ? email : a.email;
      if (hashPsw){
        a.password=hashPsw;
      }
        if (name) {
          a.userImg = name;
        }
    }
  });

    fileUp.mv("db/files/users/" + name, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      let img = {
        name,
        url: "users/" + name,
      };
      upload.push(img);
      writeF("upload.json", upload);
    });

  writeF("users.json", users);
  res.status(200).send(
    JSON.stringify({
      msg: "Updated!",
    })
  );
};

module.exports = {register, login ,updateUser};
