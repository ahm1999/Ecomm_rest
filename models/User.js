const { DataTypes, Sequelize, Model } = require("sequelize");

const { sequelize } = require("../util/database");
const bcrypt = require('bcrypt')


class User extends Model {
   constructor(user_name, email, password) {
    super();
    (this.name = user_name), (this.email = email), (this.password = password);
  }

  static async email_registered(_email) {
    let ret_User = {};
    try {
      ret_User = await User.findOne({ where: { email: _email } });
     // console.log(ret_User);
    } catch (error) {
      throw(error);
    }
    if (ret_User !== null) {
      return true;
    } else {
      return false;
    }
  }
  static async logIn_User(_email,password) {
    let ret_User = {};
    try {
      ret_User = await User.findOne({ where: { email: _email } });
      let hashedPassword = ret_User.dataValues.name.password
      
      let result =  await  bcrypt.compare( password,hashedPassword)
      if (!result){
        return false 

      }
      return ret_User.dataValues.name.id

    } catch (error) {
      throw(error);
    }}
  static async findById(_id){
    let ret_User
    try {
      ret_User = await User.findOne({ where: { id: _id } });
      let user = ret_User.dataValues.name
      
      if (!user) {
        return false}

      return user
      
    } catch (error) {
      throw(error)
      
    }

  }
  static async getRole(_id){
    try {
      let ret_User = await User.findOne({ where: { id: _id } });
      let role = ret_User.dataValues.name.role
    if (!role) {
        return false}

    return role  

  } catch (error) {
    throw(error)
    
  }
    

}}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["User", "admin"],
      defaultValue: "User",
    },
  },
  { sequelize }
);
module.exports = { User };
