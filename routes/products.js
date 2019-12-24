const express = require('express');
const router = express.Router();
const models = require('../models').Product;
const Product = require('../Models/Product');

router.get('/product/list', function (req, res, next) {
  try {
    models.findAll().then(list => {
      res.send(list)
    }).catch((error) => {
      console.log(error.toString())
      res.status(400).send(error)
    })
  } catch (e) {
    console.log(e)
  }
});

router.get('/product/:id', function (req, res, next) {
  try {
    models.findByPk(req.params.id).then(product => {
      res.status(200).send(product)
    }).catch((error) => {
      console.log(error.toString())
      res.status(400).send(error)
    })
  } catch (e) {
    console.log(e)
  }
});

router.put('/product/:id', function (req, res, next) {
  let updatedProduct = new Product(req.body.name, req.body.proteins, req.body.fat, req.body.carbohydrates);
  models.update(
    {
      productName: updatedProduct.name
      , productProteins: updatedProduct.proteins
      , productFat: updatedProduct.fat
      , productCarbohydrates: updatedProduct.carbohydrates
      , productCount: updatedProduct.count
      , productKcal: updatedProduct.kcal
    },
    {
      where: {id: req.params.id}
    }).then(() => {
    res.json("Aukcja zaktualizowana")
  }, error => {
    console.log(error);
    res.json("Coś poszło nie tak");
  })
});


router.delete('/product/:id', function (req, res, next) {
  models.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.json("Pomyślnie usunięto");
  }, error => {
    console.log(error);
    res.json("Coś poszło nie tak");
  })
});


router.post('/product/add', function (req, res, next) {
  try {
    let newProduct = new Product(req.body.name, req.body.proteins, req.body.fat, req.body.carbohydrates);
    models.create({
      productName: newProduct.name
      , productProteins: newProduct.proteins
      , productFat: newProduct.fat
      , productCarbohydrates: newProduct.carbohydrates
      , productCount: newProduct.count
      , productKcal: newProduct.kcal
    }).then(() => res.status(200).send("Success"), error => {
      console.log(error);
      res.status(400).send("Przykro mi coś poszło nie tak");
    })
  } catch (e) {
    console.log(e);
  }

  // res.end(JSON.stringify("Success"));
});

router.post('/product/add/multiply', function (req, res, next) {
  try {
    models.bulkCreate(req.body.Products).then(() => res.status(200).send("Success"), error => {
      console.log(error);
      res.status(400).send("Przykro mi coś poszło nie tak");
    })
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
