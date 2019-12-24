'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      productName: {
        type: Sequelize.STRING,
        allowNull: false

      },
      productProteins: {
        type: Sequelize.DOUBLE
        , allowNull: false
      },
      productFat: {
        type: Sequelize.DOUBLE
        , allowNull: false
      },
      productCarbohydrates: {
        type: Sequelize.DOUBLE
        , allowNull: false
      },
      productCount: {
        type: Sequelize.DOUBLE
        , allowNull: false
      },
      productKcal: {
        type: Sequelize.DOUBLE
        , allowNull: false
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
    return queryInterface.dropTable('Products');
  }
};
