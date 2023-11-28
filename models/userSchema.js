import mongoose from "mongoose";
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    // unique: [true, "Username already exists"],
    minlength: 5,
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    // unique: [true, "Email already exists"],
    minlength: 5,
    maxlength: 20
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 5
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 5
  },
},
  {
    timestamps: true,
  }
)

let User = mongoose.model('User', userSchema);

export {User};