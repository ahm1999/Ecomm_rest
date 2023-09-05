const sendErrorResponse = (code, err_messege,next) => {

  const error = new Error(err_messege)
  error.statusCode = code
  
  next(error)
};

module.exports = { sendErrorResponse };
