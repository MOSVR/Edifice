const uploadFile = require("./../middleware/upload.js");
const fs = require('fs');
const baseUrl = "http://localhost:8080/api/files/";

const upload = async (req, res) => {
  try {
    //console.log(req.title);
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 5MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.sendFile(directoryPath+fileName);
  // var stream = fs.createReadStream(directoryPath,{
  //     flag: 'a+',
  //     encoding: 'UTF-8',
  //     start: 5,
  //     end: 64,
  //     highWaterMark: 16
  // });

  // res.setHeader('Content-disposition', 'inline; filename="' + fileName + '"');
  // res.setHeader('Content-type', 'application/pdf');

  // stream.pipe(res);
  // res.download(directoryPath + fileName, fileName, (err) => {
  //   if (err) {
  //     res.status(500).send({
  //       message: "Could not download the file. " + err,
  //     });
  //   }
  // });
};

module.exports = {
  upload,
  getListFiles,
  download,
};