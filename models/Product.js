const { DataTypes, Sequelize, Model } = require("sequelize");

const { sequelize } = require("../util/database");

class Product extends Model {
  /* updateValueById(_id){
    Product.findByPk()
  }  */

  constructor(name, inStorage, description, imageUrl,price) {
    super();((this.name = name)),
      (this.inStorage = inStorage),
      (this.description = description),
      (this.imageUrl = imageUrl),
      (this.price = price);
  }
}
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inStorage: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
    price:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
  }
);

module.exports = { Product };
