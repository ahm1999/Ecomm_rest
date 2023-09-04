const express = require("express");
const { errorHandler } = require("./middlewares/errorHandler.js");

//database setup
const {sequelize } = require('./util/database.js')
const { User } = require('./models/User.js')
const { Product } = require('./models/Product.js')
const { Cart } = require('./models/cart.js')
const { CartItem } = require('./models/cartItem.js')
const {Order} = require ('./models/order.js')
const {OrderItem} = require("./models/orderItem")
require("dotenv").config();

//console.log(process.env)

//setup 
const app = express();
app.use(express.json())
//routes imports
const {error404_all} =require('./middlewares/error404.js')
const authRoutes = require ('./routers/authRoutes.js')
const productRoutes = require('./routers/productsRoutes.js')
const cartRoutes = require ('./routers/cartRoutes.js')

app.get("/", (req, res, next) => {
  res
  .status(200)
  .json({ name: "ahmed" });
});
app.use("/prods",productRoutes)
app.use('/auth',authRoutes)
app.use("/Cart",cartRoutes)
app.use(errorHandler);
//**************************
app.use("*",error404_all)

User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart,{through:CartItem})
User.hasMany(Order);
Product.belongsToMany(Order,{through:OrderItem})

const PORT = 3000;
sequelize.sync( /* {alter:true} */ )
.then(()=>{
  app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);

  });

})
