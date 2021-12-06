const {Router} = require("express");
const authRouter = require("./auth.router");


const routerApi = (app) =>{
    const router = Router();
    router.use("/", authRouter);

    app.use("/api/auth", router);
}


module.exports = routerApi;