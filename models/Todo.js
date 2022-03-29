// 

const mongoose = require("mongoose");
const { stringify } = require("uuid");

const Todo = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    completionDatetime:{
      type:String,
      required:true
    },
    iscompleted:{
      type:Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", Todo);