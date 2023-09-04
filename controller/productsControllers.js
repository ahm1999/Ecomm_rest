const { Product } = require("../models/Product");
const { BodyObject } = require("./authControllers");
const {sendErrorResponse} = require('../util/util')
async function addProduct_POST(req, res, next) {
  const product_BO = new Product_BodyObject(
    req.body.name,
    req.body.inStorage,
    req.body.description,
    req.body.imageUrl,
    req.body.price
  );
  let missingValue = BodyObject.checkUndefined(product_BO);
  if (missingValue) {
    return sendErrorResponse(400, res, `missing value ${missingValue}`);
  }
  try {
    const product = new Product(product_BO.name,product_BO.inStorage,product_BO.description,product_BO.imageUrl,product_BO.price)
    return res.json(await product.save());
  } catch (error) {
    next(error);
  }
}

async function getProduct_GET(req,res,next) {
   
   try {
    res.json({
        status:"success",
        data: await Product.findOne({where:{id:req.params.productId}})
    })
   } catch (error) {
    return next(error)
   }
   
    
}
class Product_BodyObject {
  constructor(name, inStorage, description, imageUrl,price) {
    (this.name = name),
      (this.inStorage = inStorage),
      (this.description = description),
      (this.imageUrl = imageUrl),
      (this.price = price);
  }
}

module.exports = {addProduct_POST,getProduct_GET};
