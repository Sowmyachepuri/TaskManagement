const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    Username:{
        type:String
    },
    Email:{
        type:String
    },
    PhoneNumber:{
        type:String
    },
    Password:{
        type:String
    },
    Token:{
        type:String
    },
    Otp:{
        type:String
    },
    Active:{
        type:Number
    },
    Role:{
        type:String
    },
    Image:{
        type:String
    },
    Country:{
        type:String
    },
    City:{
        type:String
    },
    UserType:{
        type:String
    },
    Gender:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user);
