const jwt = require("jsonwebtoken");

require("dotenv").config();

const {body, validationResult} = require("express-validator");

const User = require("../models/user.model");

const newToken = user =>{
  return jwt.sign({
      user:user
  }, process.env.JWT_ACCESS_KEY)
}

const register = async(req, res)=>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        let newErrors = errors.array().map(({
            msg, param, location
        })=>{
            return {
                [param]:msg,
            }
        });

      return res.status(400).json({
          errors:newErrors,
      });
    }
    try{
        let user = await User.findOne({
            email:req.body.email
        }).lean().exec();

        if (user) return res.status(400).send("user already exisits");
        user = await User.create(req.body);

        const token = newToken(user);
        return res.status(201).json({
            user, token
        });
    } catch(e){
        return res.status(500).json({
            message:e.message
        })
    }
}

const login = async (req, res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        let newErrors = errors.array().map(({
            msg,
            param, location
        })=>{
            return {
                [param]: msg
            }
        });
        return res.status(400).json({
            errors: newErrors,
        })
    }
    try{
        let user = await User.findOne({
            email:req.body.email
        })
        if (!user){
            return res.status(400).send("please provide correct details")
        }
        const match = await user.checkPass(req.body.password);
        if (!match){
            return res.status(400).send("please provide correct details");

        }
        const token = newToken(user);
        return res.status(201).send({
            user, token
        })
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
}

module.exports = {
    register,
    login
}