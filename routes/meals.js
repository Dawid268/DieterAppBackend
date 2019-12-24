const express = require('express');
const mealService = require("../Services/MealService");
const router = express.Router();
const meal = require('../models').Meal;
const product = require('../models').Product;
const mealProduct = require('../models').MealProduct;
const Product = require('../Models/Product');
const Meal = require('../Models/Meal');

router.get('/meal/:id', function (req, res, next) {
  return mealService.prototype.foundSingleMealByPk(req, res);
});

router.get('/meal/products/:id', function (req, res, next) {
  return mealService.prototype.getProductsInSingleMeal(req, res);
});

router.delete('/meal/products/:mealId/:productId', function (req, res, next) {
  return mealService.prototype.deleteProductInSingleMeal(req, res);
});

router.get('/list', function (req, res, next) {
  return mealService.prototype.getMealListWithProducts(req, res);
});


router.delete('/meal/:id', function (req, res, next) {
  return mealService.prototype.deleteMealById(req, res);
});


router.post('/meal/add', function (req, res, next) {
  return mealService.prototype.createNewMeal(req, res);

});

router.put('/meal/update/:id', function (req, res, next) {
  return mealService.prototype.updateMealById(req, res);

});

module.exports = router;
