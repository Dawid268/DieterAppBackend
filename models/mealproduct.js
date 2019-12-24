'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealProduct = sequelize.define('MealProduct', {
    meal_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {});
  MealProduct.associate = function(models) {
    // associations can be defined here
  };
  return MealProduct;
};