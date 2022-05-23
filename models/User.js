const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  email: { type: String, required:true},
  password: { type: String, required: true },
  isAdmin:{type:Boolean,default:false}
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email, isAdmin:
    this.isAdmin
  }, config.get('jwtPrivateKey'))
  return token
}


module.exports=mongoose.model('users',userSchema)