const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { promisify, log } = require("util");
const { sendErrorResponse } = require("../util/util");



function routeProtector (role)
{

return async (req,res,next)=>{
  try{
  const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      "dfadgagop65464fa65d46gg74s654f4s"
    );
   
    if (!decoded) {
      return sendErrorResponse(404, res, "resuorse doesn't exist");
    }
    let user = await User.findById(decoded.id);
    console.log(user.role);

    if (role === "admin"&& user.role !==role) {
      return sendErrorResponse(404, res, "resuorse doesn't exist");
    }

    return next();
  } catch (error) {
    next(error);
  }


}}
module.exports = { routeProtector };
