module.exports = (sequelize, Sequelize) => {
    const DirectCost = sequelize.define("directcost", {
      costCode: {
        type:Sequelize.STRING   
      },
      description: {
        type: Sequelize.STRING
      },
      vendor: {
        type: Sequelize.STRING
      },
      employee: {
        type: Sequelize.STRING
      },
      receivedDate: {
        type: Sequelize.DATEONLY
      },
      paidDate: {
        type: Sequelize.DATEONLY
      },
      amount: {
        type: Sequelize.DECIMAL(20, 2) 
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },  
    }, {
        freezeTableName: true,
    });
  
    return DirectCost;
};