const { response } = require("express");
const Usuario = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../utils/jwt");

const loginUser = async (req,res = response)=>{
    const {email, password} = req.body;

    try{
        // FIND USER IN DB BY EMAIL
        const dbUser = await Usuario.findOne({email});
        
        // IF USER NOT EXITS
        if( !dbUser ) res.status(400).json({
            ok: false,
            msg: "Email not valid"
        });

        // CHECK IF PASSWORD MATCHES
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        // IF PASSWORD IS NOT CORRECT
        if(!validPassword) res.status(400).json({
            ok: false,
            msg: "Password incorrect"
        });

        // GENERATE JWT
        const token = await generateJWT(dbUser.id, dbUser.name);

        // RESPONSE FROM SERVICE
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        });

    }catch(e){
        console.error(e);

        return res.statuts(500).json({
            ok: true,
            msg: "Talk to an admin"
        });
    };
};

const createUser = async (req,res = response)=>{
    const {email, name, password} = req.body;
    try{
        // CHECK EMAIL
        //let user = await Usuario.findOne({email: email})
        const user = await Usuario.findOne({email});
        if(user) res.status(400).json({
            ok: false,
            msg: "email already registered "
        });

        // CREATE MODEL USER
        const dbUser = new Usuario(req.body);

        // HASH PASSWORD
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // GENERATE JWT
        const token = await generateJWT(dbUser.id, name);

        // CREATE DB USER
        dbUser.save();

        // GENERATE SUCCESSFUL RESPONSE
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: name,
            token
        });

    }catch(e){
        console.error(e);
        return res.status(500).json({
            ok: false,
            msg: "Please talk to the admin"
        });
    };
};
// REVALIDATE TOKEN
const renewToken = async (req,res = response)=>{
    
    const {uid, name} = req;

    // GENERATE JWT
    const token = await generateJWT(uid, name);

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
};


module.exports= {
    createUser,
    loginUser,
    renewToken
};

