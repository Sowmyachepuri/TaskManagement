const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskAssignment = new Schema(
  {
    TaskId:{
        type:String
    },
    UserIds:[],
    AssignedDate:{
      type:String
    },
    AdminId:{
      type:String
    },
    Role:{
      type:String
    },
    Status:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TaskManagement", taskAssignment);
