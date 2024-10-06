const mongoose = require("mongoose");
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const workInfoModel = new mongoose.Schema({
  workInfoId: { type: String },
  personalProject: { type: String, ref: "personalInfo" },
  workProcess: { type: String, ref: "workinfo" },
  personalSkill: { type: String},

});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const WorkInfoModel = mongoose.model("workInfo", workInfoModel);
module.exports =  WorkInfoModel;
