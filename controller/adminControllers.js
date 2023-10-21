const { Order } = require("../models/order");
const { sequelize } = require("../util/database");
const {catchAsync} = require("../util/catchAsync")
const allOrders = async (req, res, next) => {
  let pageNo = 0
  if (req.query.pageno>0) {
    pageNo = req.query.pageno
  }
  try {
    let _data = await Order.getOrderData(pageNo);
    res.json({ status: "success", data: _data });
  } catch (error) {
    next(error);
  }
};
const orderCount = async (req,res,next)=>{
  try {
    let _count = await Order.count()
    res.json({status:"success",data:_count})
  } catch (error) {
    next(error)
  }
}
const orderbyId = async (req,res,next)=>{
 
try{
  let _order = await Order.getOrderJoinedProduct( req.params.orderid)
  res.json({status:"success",data:_order})
}
catch(error){
  next(error)
}
}

const getGraphData_GET = async (req,res,next) =>{
try {
  let  [_graphData,_meta] = await Order.getGraphData()
  res.json({status:"success",data:_graphData}) 
} catch (error) {
  next(error)
}
} 

module.exports = { allOrders ,orderCount,orderbyId,getGraphData_GET};
