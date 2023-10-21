const { Product } = require("../models/Product");
const { BodyObject } = require("./authControllers");
const {sendErrorResponse} = require('../util/util')
const {catchAsync} = require("../util/catchAsync")

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
    return sendErrorResponse(400, `missing value ${missingValue}`,next);
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
const getAllProducts_GET = catchAsync( async (req,res,next)=>{
  let pageNo = 0
  if (req.query.pageno>0) {
    pageNo = req.query.pageno
  }
  
    res.json({
      status:"success",
      data: await Product.findAndCountAll({raw:true,limit:10,offset:10*pageNo})
    })

})

const updateProduct_PATCH = catchAsync( async (req,res,next) =>{

const cleanedBodyObject =  removeEmptyValues(req.body)
const _id =  req.params.productId

if (Object.keys(cleanedBodyObject).length === 0) {
    return sendErrorResponse(400, "the request body is empty ",next)
}
  const response = await Product.updateRecord(_id,cleanedBodyObject) 
  return res.json({
    status:"success",
    data:response
  })

})
//------------------------------------------------

class Product_BodyObject {
  constructor(name, inStorage, description, imageUrl,price) {
    (this.name = name),
      (this.inStorage = inStorage),
      (this.description = description),
      (this.imageUrl = imageUrl),
      (this.price = price);
  }
}
function removeEmptyValues(bodyObject) {
  for (const key in bodyObject){
    if (bodyObject[key] ===""|| bodyObject[key] === 0) {
      delete bodyObject[key] 
    }

  }
  return bodyObject
  
}


module.exports = {addProduct_POST,getProduct_GET,getAllProducts_GET,updateProduct_PATCH}
