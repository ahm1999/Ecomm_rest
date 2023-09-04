const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { Cart } = require("../models/cart");
const { CartItem } = require("../models/cartItem");
const { sendErrorResponse } = require("../util/util");
const { OrderItem } = require("../models/orderItem");
const { Product } = require("../models/Product");
const { Order } = require("../models/order");
const { decode } = require("punycode");


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
      data: await Cart.getCart(decoded.id),
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


async function checkOut(req,res,next) {

//when checkout

// if cart is empty return error cart is already empty 
const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(
    token,
    "dfadgagop65464fa65d46gg74s654f4s"
  );
  try {
    await Order.createAfullOrder(decoded)
    return res.status(201).json({status:"success",data:"Your Order has been submitted"})
 
  }catch (error){
    next(error)
  }

//creates order with userid relating to the user 
//goes through each element in Cartitem and adds them to the order item wihle decrementing each element from the 
//products table by the amount specified in the Cart Item

//deletes the cart 



  
}
module.exports = { addtoCart, viewCart,checkOut };
