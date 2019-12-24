const meal = require('../models').Meal;
const product = require('../models').Product;
const mealProduct = require('../models').MealProduct;


class MealService {

  foundSingleMealByPk(req, res) {
    try {
      meal.findByPk(req.params.id, {
        include: [{
          model: product,
          as: 'Products'
        }],
      }).then(value => {
        res.status(200).send(value);
      }).catch((error) => {
        res.status(404).send("Error");
        console.log(error.toString())
      })
    } catch (e) {
      console.log(e)
    }
  }

  getProductsInSingleMeal(req, res) {
    meal.findByPk(req.params.id, {
      include: [{
        model: product,
        as: 'Products'
      }],
    }).then(value => {
      res.status(200).send(value.Products);
    }).catch((error) => {
      res.status(404).send("Error");
      console.log(error.toString())
    })
  }

  deleteProductInSingleMeal(req, res) {
    mealProduct.destroy({
      where: {
        meal_id: req.params.mealId,
        product_id: req.params.productId
      }
    }).then(() => {
      res.status(200).send({success: "Success"});
    }).catch((error) => {
      res.status(404).send("Error");
      console.log(error.toString())
    });
  }

  getMealListWithProducts(req, res) {
    try {
      meal.findAll(
        {
          include: [{
            model: product,
            as: 'Products'
          }],
        }
      ).then(list => {
        res.status(200).send(list)
      }).catch((error) => {
        console.log(error.toString())
        res.status(400).send(error)
      })
    } catch (e) {
      console.log(e)
    }
  }

  deleteMealById(req, res) {
    meal.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.status(200).send({success: "Success"});
    }).catch((error) => {
      res.status(404).send("Error");
      console.log(error.toString())
    });
  }

  createNewMeal(req, res) {
    let proteins = 0;
    let fat = 0;
    let carbo = 0;
    let kcal = 0;
    try {
      meal.create({
        mealName: req.body.mealName,
        dayOfTheWeek: req.body.dayOfTheWeek
        , sumProteins: req.body.sumProteins
        , sumFat: req.body.sumFat
        , sumCarbo: req.body.sumCarbohydrates
        , sumKcal: req.body.sumCalories
      }).then(meal => {
        let prodList = req.body.Products;
        for (let prod of prodList) {
          product.create(
            {
              productName: prod.productName,
              productProteins: prod.productProteins,
              productFat: prod.productFat,
              productCarbohydrates: prod.productCarbohydrates,
              productCount: prod.productCount,
              productKcal: prod.productKcal
            }
          ).then(() => product.findOrCreate({
            where:
              {
                productName: prod.productName,
                productCount: prod.productCount
              }
          })).then(([product, created]) => {
            meal.addProduct(product);
            proteins += product.productProteins;
            fat += product.productFat;
            carbo += product.productCarbohydrates;
            kcal += product.productKcal;
          })
        }
      }).then(() => {
        res.status(200).send({success: "Success"});
      })
        .catch((error) => {
          res.status(404).send("Error");
          console.log(error.toString())
        })
    } catch (e) {
      console.log(e);
    }
  }

  updateMealById(req, res) {
    let proteins = 0;
    let fat = 0;
    let carbo = 0;
    let kcal = 0;
    meal.findByPk(req.params.id, {
      include: [{
        model: product,
        as: 'Products'
      }],
    }).then(meal => {
      let prodList = req.body.Products;
      for (let prod of prodList) {
        product.create(
          {
            productName: prod.productName,
            productProteins: prod.productProteins,
            productFat: prod.productFat,
            productCarbohydrates: prod.productCarbohydrates,
            productCount: prod.productCount,
            productKcal: prod.productKcal
          }
        ).then(() => product.findOrCreate({
          where:
            {
              productName: prod.productName,
              productCount: prod.productCount
            }
        })).then(([product, created]) => {
          meal.addProduct(product);
          proteins += product.productProteins;
          fat += product.productFat;
          carbo += product.productCarbohydrates;
          kcal += product.productKcal;
        }).then(() => {
          meal.update(
            {
              sumProteins: parseInt(proteins)
              , sumFat: parseInt(fat)
              , sumCarbo: parseInt(carbo)
              , sumKcal: parseInt(kcal)
            },
            {
              where: {id: req.params.id}
            })
        })
      }
    }).then(() => {
      res.status(200).send({success: "Success"});
    }).catch((error) => {
      res.status(404).send("Error");
      console.log(error.toString())
    })
  }
}

module.exports = MealService;
