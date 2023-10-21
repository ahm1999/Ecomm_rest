const { DataTypes,  Model } = require("sequelize");

const { sequelize } = require("../util/database");
const {Cart } = require('./cart.js')
const{OrderItem} = require('./orderItem')
const {Product} = require ('./Product');
const { User } = require("./User");
class Order extends Model {
  static async getGraphData(){
    try {
      let response = await sequelize
      .query({query:
      `SELECT
      date_bin('1 day', "createdAt",current_date ) as Time,
      count(*) as Total
      from "Orders"
      where "createdAt"> current_date -  interval '30' day
      GROUP BY 1
      order by 1`})
      return response;
    } catch (error) {
      throw error;
    }
 
  }
  static async getOrderJoinedProduct(_id){
  try {
   let response = await sequelize
   .query({query:
  `select "OrderItems"."OrderId","OrderItems"."quantity",
  "Products"."name" as "product_name",
  "Products"."price" as"product_price",
  "Users"."name" as "userName",
  "Users"."email" as "userEmail"
  from "OrderItems"
  left join "Orders" on "Orders"."id" = "OrderItems"."OrderId"
  left join "Users" on "Orders"."UserId" = "Users"."id"
  left join "Products" on "Products"."id"= "OrderItems"."ProductId"
  where "OrderItems"."OrderId" = ?`,values:[(_id)]}) 
  return response;
  } catch (error) {
    throw error;
  }
  }
  static async getOrderData(_pageNo){
  ///that would be name and created at ect
  try {
  let response =  await sequelize
  .query({query:
`SELECT "User"."id", "User"."name", "User"."email", "User"."password", "User"."role", "User"."createdAt", "User"."updatedAt", "Orders"."id" AS "OrdersId", "Orders"."createdAt" 
  AS "OrdersCreatedAt", "Orders"."updatedAt" AS "OrdersUpdatedAt", "Orders"."UserId" AS "OrdersUserId"
  FROM "Users" AS "User"
  LEFT OUTER JOIN "Orders" AS "Orders" ON "User"."id" = "Orders"."UserId" 
  LIMIT 10 OFFSET ?;`,values:[ (10*_pageNo)]})
  
  /* User.findAll({raw:true,  include:{model:Order},where:{role:"User"}}) */
   return response; 
  } catch (error) {
    throw error;
  }
 }
 static async  createAfullOrder(decoded){
  try {
    let _cart = await Cart.getCart(decoded.id);
    if (_cart === null) {
      return sendErrorResponse(400,res,"your cart is empty")
      
    }
    let _order= await Order.create({UserId:decoded.id})
    
    //console.log(_cart);
     const array =  _cart.map(function(elem) {
      Product.decrement('inStorage',
      {by :elem.dataValues.quantity
        ,where:{
          id:elem.dataValues.ProductId
        }})
       return {
         quantity: elem.dataValues.quantity,
         ProductId:elem.dataValues.ProductId ,
         OrderId:_order.dataValues.id
       } 
     })
     await OrderItem.bulkCreate(array)
     await Cart.destroy({where:{
       UserId:decoded.id
     }})
     await Cart.create({UserId:decoded.id})
     return
  
  } catch (error) {
    throw error
  }
}
}

Order.init(
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

)

module.exports = {Order}