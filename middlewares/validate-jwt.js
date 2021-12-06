const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) =>{
    const token = req.header("x-token");

    if(!token) return res.status(401).json({
        ok: false,
        msg: "Token fail"
    });

    try{

        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    }catch(e){
        console.error(e);
        return res.status(401).json({
            ok: false,
            msg: "Not valid token"
        });
    };

    // OK
    next();
};

module.exports = {
    validateJWT
};