const sendErrorResponse = (code, res, err_messege) => {
  res.status(code).json({
    status: "failed",
    body: err_messege,
  });
};

module.exports = { sendErrorResponse };
