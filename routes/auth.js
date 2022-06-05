const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "lakshyaisagoodboy@l";
const fetchuser=require("../middleware/fetchuser");

// this is imported for validation
const { body, validationResult } = require('express-validator');

// create user using post request and it does not require authentication
// first we check the validation of data

// Route 1:
router.post("/create-user", [
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be of atleast five characters.').isLength({ min: 5 })
],


    // if there is an error then send the bad request
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success:false, errors: errors.array() });
        }
        // const user=User(req.body);
        // user.save();

        // creating user
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success:false, error: "user is already exist" });
            }


            // if we want to get somethin from promise then we have to use the async and await 

            // now will hashed the password using bcrypt



            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({ success:true,authtoken:authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }










    });





// route 2
// end point for login,, there is no authentication required
router.post("/login", [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password can not be empty').exists(),
],

    // if ther is any errors return a bad request
    async (req, res) => {
        let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success:false, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({success:false, error: "login with correct credentials" });
                return;
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                res.status(400).json({success:false, error: "login with correct credentials" });
                return;
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success:true,authtoken:authToken})

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }


    });





// route 3 to get the detail user of logged in user
router.post("/get-user",fetchuser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        User.findOne({id:req.user.id},(err,user)=>{
            if(err)
            {
                console.log("there is an error in fetching the data");
                return ;    
            }
            res.json(user);
        })
    }
)


module.exports = router;