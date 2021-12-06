const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    };
    // Next is gonna be called when these filters are passed properly
    next();
};

module.exports = {
    validateFields
};