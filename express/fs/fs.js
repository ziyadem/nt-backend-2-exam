const fs=require("fs");

//read file
const readF = (file_name) => {
  return JSON.parse(fs.readFileSync(`./db/${file_name}`, "utf-8"));
};

//write file
const writeF = (file_name, data) => {
  return fs.writeFileSync(
    `./db/${file_name}`,
    JSON.stringify(data, null, 4)
  );
};

module.exports= { readF, writeF };
