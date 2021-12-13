const express = require("express");

const Seat = require("../models/screens.model");
const router = express.Router();

router.post("/", async (req, res) => {

    const product = await Seat.create(req.body);
    return res.send(product);

})

router.get("", async (req, res) => {
    const movies = await Seat.find().lean().exec();
    return res.json({
        movies
    })
})
// router.get("/movie/:show_id", async (req, res) => {
//     const movies = await Show.find().populate({
//         path: "movie_id"
//     }).lean().exec();
//     return res.json({
//         movies
//     })
// })
module.exports = router;