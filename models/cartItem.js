const { DataTypes,  Model } = require("sequelize");

const { sequelize } = require("../util/database");



class CartItem extends Model{}

CartItem.init({
    id: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity:{
        type:DataTypes.INTEGER,
        defaultValue:1
      }
},{
    sequelize
})


module.exports={CartItem}