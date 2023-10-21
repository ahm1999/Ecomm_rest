const { DataTypes, Sequelize, Model } = require("sequelize");

const { sequelize } = require("../util/database");


class Product extends Model {
  static async updateRecord(_id,cleanedBodyObject){
    try {
      let response = await Product.findByPk(_id,{raw:true})
     let _Product = new Product(response.name,response.inStorage,response.description,response.imageUrl,response.price );
    /*  _Product.update(_id,cleanedBodyObject)
     response =  _Product.save() */
    
    let changedProduct =  Object.assign(_Product.dataValues,cleanedBodyObject)
    
     //let changedProduct = mergeData(_Product.dataValues,cleanedBodyObject)

     const result = await sequelize.query({query:
      `update "Products"
      set "name" = ?,
      "inStorage" = ?,
       "description" = ?,
       "imageUrl" = ?,
       "price" = ?,
       "updatedAt" =NOW()::timestamp
        where "id" = ?`,values:[changedProduct.name,changedProduct.inStorage,changedProduct.description,changedProduct.imageUrl,changedProduct.price,_id]})
      return  await Product.findByPk(_id,{raw:true})
    } catch (error) {
      //console.log(error);
     throw error
      
    }
  
  }

  constructor(name, inStorage, description, imageUrl,price) {
    super();((this.name = name)),
      (this.inStorage = inStorage),
      (this.description = description),
      (this.imageUrl = imageUrl),
      (this.price = price);
  }
}
Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inStorage: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
    price:{
      type:DataTypes.INTEGER
    }
  },
  {
    sequelize,
  }
);

/* function mergeData (toBeChanged,changes){

   return Object.assign(toBeChanged,changes)
  
  /* keys(changes).forEach((element)=>{
    console.log("to be changed ",toBeChanged[element]);
    console.log("changes ",changes[element]);
    toBeChanged[element] = changes[element]

  }) */

  /* return toBeChanged; */

module.exports = { Product };
