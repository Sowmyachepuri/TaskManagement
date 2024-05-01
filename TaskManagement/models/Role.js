const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const role = new Schema(
  {
    RoleName:{
        type:String
    },
    Status:{
      type:String
    },
    AdminId:{
      type:String
    }
    // Permissions:[],
},   
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", role);
