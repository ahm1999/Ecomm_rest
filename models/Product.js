const { DataTypes, Sequelize, Model } = require("sequelize");

const { sequelize } = require("../util/database");

class Product extends Model {
  constructor(name, inStorage, description, imageUrl) {
    super();((this.name = name)),
      (this.inStorage = inStorage),
      (this.description = description),
      (this.imageUrl = imageUrl);
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
  },
  {
    sequelize,
  }
);

module.exports = { Product };