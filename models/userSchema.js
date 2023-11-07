import mongoose from "mongoose";

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
})

let User = mongoose.model('User', userSchema);

export {User};