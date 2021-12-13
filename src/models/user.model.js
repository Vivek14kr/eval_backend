const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs")
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
   password:{
       type:String,
       required:true
   },
   profile_photo_url:{
       type:String,
       required:true
   },
   roles:{
       type:String,
       required:true
   }
},{
    versionKey:false,
    timestamps:true
})

userSchema.pre("save", function(next){
    if (!this.isModified("Password")) return next();
    const hash = bcrypt.hashSync(this.password, 8);

    this.password = hash;
    next();
})

userSchema.methods.checkPass = function (password){
    return new Promise((res, rej)=>{
        {
            bcrypt.compare(password, this.password, function (err, same) {
                if (err) rej(err);
                return res(same);
            })
        }
    })
}


module.exports = model("user", userSchema);