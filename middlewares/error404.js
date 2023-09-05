const {sendErrorResponse} = require('../util/util')
exports.error404_all = (req, res, next) => {
const error = new Error('this resource doesn\'t exist')
    const errMsg = error.message ;
    res.status(404).json({
        success: false,
        status: 404,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? error.stack : {}
    })
};