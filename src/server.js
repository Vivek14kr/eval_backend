const app = require("./index");

const connect = require("./configs/dbs");

app.listen(2234, async(req, res)=>{
    await connect();
    console.log("listening")
})