const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { Cart } = require("../models/cart");
const { CartItem } = require("../models/cartItem");

async function addtoCart(req, res, next) {
  //console.log('add to cart '+req.params.prodId);
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(
    token,
    "dfadgagop65464fa65d46gg74s654f4s"
  );
  try {
    await Cart.addtoCartItems(decoded.id, req.params.prodId);
    return res.json({
      status: "success",
      data: await CartItem.findAll({ where: { CartId: _cartId } }),
    });
  } catch (error) {
    next(error);
  }
  // console.log(decoded);
}

async function viewCart(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(
    token,
    "dfadgagop65464fa65d46gg74s654f4s"
  );
  try {
    let _cart = await Cart.getCart(decoded.id);

    res.json({
      status: "success",
      data: _cart,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { addtoCart, viewCart };
