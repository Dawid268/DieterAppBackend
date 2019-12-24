'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    mealName: {
     type: DataTypes.STRING,
      AllowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    dayOfTheWeek:  {
      type: DataTypes.STRING,
      AllowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    sumProteins: {
      type:DataTypes.DOUBLE,
      AllowNull: false,
    },
    sumFat: {
      type:DataTypes.DOUBLE,
      AllowNull: false,
    },
    sumCarbo: {
      type:DataTypes.DOUBLE,
      AllowNull: false,
    },
    sumKcal: {
      type:DataTypes.DOUBLE,
      AllowNull: false,
    },
  }, {});
  Meal.associate = function (models) {
    // Meal.belongsTo(models.User, {
    //   foreignKey: 'user_id'
    // });
    Meal.belongsToMany(models.Product,{ as: 'Products', through: 'MealProducts', foreignKey: 'meal_id' })

  };
  return Meal;
};
