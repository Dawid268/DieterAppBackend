'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      mealName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dayOfTheWeek: {
        type: Sequelize.STRING,
        allowNull: false

      },
      sumProteins: {
        type: Sequelize.DOUBLE,
        allowNull: false

      },
      sumFat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      sumCarbo: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      sumKcal: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Meals');
  }
};
