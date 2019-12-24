class Product {
  constructor(name, proteins, fat, carbohydrates) {
    this.name = name;
    this.proteins = proteins;
    this.fat = fat;
    this.carbohydrates = carbohydrates;
    this.count = 100;
    this.kcal = ((proteins * 4) + (carbohydrates * 4) + (fat * 9));
  }

}

module.exports = Product;
