const { DataTypes, Sequelize, Model } = require("sequelize");
const { CartItem } = require("./cartItem");

const { sequelize } = require("../util/database");

class Cart extends Model {
  static async addtoCartItems(_userId, _prodId) {
    //check if element already added to cart
    let cart = await Cart.findOne({ where: { UserId: _userId } });
    let _cartItem = await CartItem.findOne({
      where: { ProductId: _prodId, CartId: cart.dataValues.id },
    });
    //if added increase the quantity by one
    if (_cartItem === null) {
      await CartItem.create({
        quantity: 1,
        ProductId: _prodId,
        CartId: cart.dataValues.id,
      });
      return cart.dataValues.id;
    } //else add a value and set the aquantity to one
    await CartItem.increment("quantity", {
      by: 1,
      where: {
        ProductId: _prodId,
        CartId: cart.dataValues.id,
      },
    });
    return cart.dataValues.id;
  }

  static async getCart(_userId) {
    try {
      let cart = await Cart.findOne({ where: { UserId: _userId } });
      return await CartItem.findAll({
        where: {
          CartId: cart.dataValues.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
  }
);

module.exports = { Cart };
