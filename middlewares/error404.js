
exports.error404_all = (req, res, next) => {
  res
  .status(404)
  .json({ statues: "error", body: "this resource doesn't exist" });
};
