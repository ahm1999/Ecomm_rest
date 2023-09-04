const Sequelize = require( "sequelize").Sequelize;
require("dotenv").config();
//console.log(process.env.DATABASE_PASSWORD);
const sequelize = new Sequelize(process.env.DATABASE_NAME,  process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host:process.env.DATABASE_HOST,
    dialect:process.env.DATABASE_DIALECT 
});

module.exports= {sequelize}
   