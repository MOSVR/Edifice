/*module.exports = app => {
    const directcost = require("./../controllers/directcost.controller");
    const excelController = require("./../controllers/excel.controller");
  
    var router = require("express").Router();



  //export
  router.get("/:id/download", excelController.download);

 
  
    app.use('/api/excel', router);
  };*/

  const express = require("express");
const router = express.Router();
const directcost = require("./../controllers/directcost.controller");
const excelController = require("./../controllers/excel.controller");
const upload = require("./../middleware/uploadExcel");

let routes = (app) => {
  router.post("/upload", upload.single("file"), excelController.upload);
  router.get("/directcosts", excelController.getDirectCosts);
  router.get("/download", excelController.download);

  app.use("/api/excel", router);
};

module.exports = routes;