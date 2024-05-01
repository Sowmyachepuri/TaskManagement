const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task = new Schema(
  {
    Title:{
        type:String
    },
    Description:{
        type:String
    },
    Status:{
        type:String
    },
    DueDate:{
        type:String
    },
    AdminId:{
      type:String
    },
    Role:{
      type:String
    }
},   
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", task);
