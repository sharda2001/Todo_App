const express = require("express")

const router=express.Router();

const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const config = require("config")
const { check,validationResult }=require("express-validator")

const auth=require("../../middleware/Auth");
const User = require("../../models/User");



/** 
 @api {get} /auth Get user information for the authenticated user
 * @apiName GetAuth
 * @apiGroup Auth
 *
 * @apiSuccess {String} name,name of the User by findById.
 * @apiSuccess {String} password, password of the User.
; */

router.get("/",auth,async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")  
        res.json(user);               
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

router.get("/",[

    check("email","please include a valid email").isEmail(),
    check(
        "password",
        "password is required"
    ).exists()

],
async(req,res) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
        return
    }

    const { email,password }=req.body;

    try{
        // see if user exists
        const user = await User.findOne({ email })

        if(!user) {
            // res.send("user route");        
            res.status(400).json({ errors: [ { msg: "Invalid credentials" }]});
            return
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            res.status(400).json({ errors: [ { msg: "Invalid credentials" }]});
            return
        }

        // return json webtoken
        // res.send("user registered");
        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign( 
            payload, 
            config.get("jwtSecret"),
            { expiresIn:360000},
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            } )

    }catch(err){
        console.error(err.message);
        res.status(500).send("server error");
        
    }   
})

module.exports=router;