const jwt = require("jsonwebtoken");

const createToken = (_id) =>{
    return  jwt.sign({_id},process.env.JWT_SECRET, {
    expiresIn:"4d"
   });
}


module.exports = createToken;