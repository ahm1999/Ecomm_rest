const { Model ,DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");


class OrderItem extends Model{}

OrderItem.init({
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


module.exports = {OrderItem}