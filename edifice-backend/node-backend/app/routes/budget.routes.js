module.exports = app => {
    const budget = require("./../controllers/budget.controller");
  
    var router = require("express").Router();
  
    // Create a new Budget
    router.post("/", budget.create);
  
    // Retrieve all Budgets for a project
    router.get("/list/:id", budget.findAll);
  
   // Retrieve all budgets for a project according to cost code
     //router.get("/list/:id?costCode=[keyword]", directcost.findByCode);
     router.get("/list/:id/:costCode", budget.findByCostCode);
  
    
    // Retrieve a single direct cost with id
    router.get("/:id", budget.findOne);

    router.get("/:id/unpublished",budget.budgetUnpublished); 

    /* Retrieve a single direct cost with id
    router.get("/:projectId/:id", directcost.findOne);*/

        // Update a direct cost with id
  router.put("/:id", budget.update);

  // Delete a direct cost with id
  router.delete("/:id", budget.delete);

  // get all total estimated budget of a project
  router.get("/:id/total", budget.getTotalBudget);


  router.get("/:id/total/overview", budget.getBudgetOverview);

    app.use('/api/projects/budget', router);
  };