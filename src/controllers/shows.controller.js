const express = require("express");

const Show = require("../models/shows.model");
const router = express.Router();

router.post("/",  async (req, res) => {

    const product = await Show.create(req.body);
    return res.send(product);

})

router.get("", async (req, res) => {
    const movies = await Show.find().lean().exec();
    return res.json({
        movies
    })
})
router.get("/movie/:movie_id", async (req, res) => {
    const movies = await Show.find().populate({
        path: "movie_id",
        populate: movie_id
    }).lean().exec();
    return res.json({
        movies
    })
})
module.exports = router;