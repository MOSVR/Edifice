module.exports = app => {
  const categorys = require("./../controllers/equipment-category.controller.js");

  var router = require("express").Router();

  // Create a new equipment category
  router.post("/", categorys.create);

  // Retrieve all equipment categorys
  router.get("/", categorys.findAll);

  // Retrieve all crews for a name
  router.get("/search", categorys.findAllName);

  /*  
    // Retrieve a single equipment with id
    router.get("/:id", equipment.findOne);
  
    // Update a equipment with id
    router.put("/:id", equipment.update);
  
    // Delete a equipment with id
    router.delete("/:id/", equipment.delete);
  
    // Delete all equipments
    router.delete("/", equipment.deleteAll);
  */
  app.use('/api/categorys', router);
};