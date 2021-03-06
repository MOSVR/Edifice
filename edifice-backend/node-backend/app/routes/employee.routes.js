module.exports = app => {
    const employee = require("./../controllers/employee.controller.js");
  
    var router = require("express").Router();
  
    // Create a new employee
    router.post("/", employee.create);
  
    // Retrieve all employees
    router.get("/", employee.findAll);

    // Retrieve all employees with user accouns
    router.get("/user", employee.findUsers);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", employee.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", employee.update);

    // Update an employee's account status with id
    router.post("/:id", employee.updateAccountStatus);
  
    // Delete a Tutorial with id
    router.delete("/:id/", employee.delete);
  
    // Delete all Tutorials
    router.delete("/", employee.deleteAll);

    // Find Last employee
    router.get("/app/last/",employee.findLastOne);
  
    app.use('/api/employee', router);
  };