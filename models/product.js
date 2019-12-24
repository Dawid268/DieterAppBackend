'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: {
      type: DataTypes.STRING,
      AllowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    productProteins: {
      type: DataTypes.DOUBLE,
      AllowNull: false,
    },
    productFat: {
      type: DataTypes.DOUBLE,
      AllowNull: false,
    },
    productCarbohydrates: {
      type: DataTypes.DOUBLE,
      AllowNull: false,
    },
    productCount: {
      type: DataTypes.DOUBLE,
      AllowNull: false,
    },
    productKcal: {
      type: DataTypes.DOUBLE,
      AllowNull: false,
    },
  }, {});
  Product.associate = function (models) {
    Product.belongsToMany(models.Meal, {as: 'Products', through: 'MealProducts', foreignKey: 'product_id'});

  };
  return Product;
};
