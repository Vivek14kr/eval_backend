const express = require("express");

const Movie = require("../models/movies.model");

const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/", async(req, res)=>{

        const product = await Movie.create(req.body);
        return res.send(product);
    
})

router.get("", async (req, res)=>{
    const movies = await Movie.find().lean().exec();
    return res.json({movies})
})


module.exports = router;