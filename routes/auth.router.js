const {Router} = require("express");
const { check } = require("express-validator");
const {createUser, loginUser, renewToken } = require('../controllers/auth.controller');
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// USER LOGIN
router.post("/",[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validateFields
], loginUser);

// CREATE USER
router.post("/new", [
    check('name', 'Name cannot be empty').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validateFields
], createUser);

// VALIDATE TOKEN
router.get("/",validateJWT, renewToken);


module.exports = router;