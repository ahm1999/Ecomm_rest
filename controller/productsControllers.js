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
async function getAllProducts_GET(req,res,next){
  let pageNo = 0
  if (req.query.pageno>0) {
    pageNo = req.query.pageno
  }
  try{
    res.json({
      status:"success",
      data: await Product.findAndCountAll({raw:true,limit:10,offset:10*pageNo})
    })
  }catch (error){
    return next(error)
  }

}

const updateProduct_PATCH =  async (req,res,next) =>{
  /* try {
  if (Object.keys(req.body) === 0) {
    return sendErrorResponse(400, res,"the request body is empty ")
    
  }
  const cleanedBodyObject =  removeEmptyValues(req.body){
  if (Object.keys(cleanedBodyObject).length === 0) {
    return sendErrorResponse(400, res,"the request body is empty ")
  } 
  const _updated =  cleanedBodyObject
    console.log(_updated);
    const response =  await Product
    .update({name:"changed"}
           ,{where:{id:req.params.productId}})
    return res.json({status:"the values have been updated",body: response })
  } catch (error) {
    return next(error)
  } 
  
} */
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
function removeEmptyValues(bodyObject) {
  for (const key in bodyObject){
    if (bodyObject[key] ===""|| bodyObject[key] === 0) {
      delete bodyObject[key] 
    }

  }
  return bodyObject
  
}


module.exports = {addProduct_POST,getProduct_GET,getAllProducts_GET/* ,updateProduct_PATCH */}
