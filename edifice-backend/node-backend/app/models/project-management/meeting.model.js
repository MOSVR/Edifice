module.exports = (sequelize, Sequelize) => {
  const Meetings = sequelize.define("meetings", {
    overview: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY
    },
    time: {
      type: Sequelize.TIME  
    },
    location: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    }
  }, {
      freezeTableName: true,
  });

  return Meetings;
};