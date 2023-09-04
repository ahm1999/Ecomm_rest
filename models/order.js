const { DataTypes,  Model } = require("sequelize");

const { sequelize } = require("../util/database");
const {Cart } = require('./cart.js')
const{OrderItem} = require('./orderItem')
const {Product} = require ('./Product')
class Order extends Model {
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