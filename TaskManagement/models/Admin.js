const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admin = new Schema(
  {
    Username:{
        type:String
    },
    Admin_adminId:{
        type:String
    },
    Email:{
        type:String
    },
    PhoneNumber:{
        type:String
    },
    Active:{
        type:Number
    },
    role:{
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
    Gender:{
        type:String
    },
    Admin:{
        type:Number
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", admin);
