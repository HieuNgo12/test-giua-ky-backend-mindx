const mongoose = require("mongoose");
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const workProcessModel = new mongoose.Schema({
  workProcessId: { type: String },
  dateOfStart: { type: Date },
  dateOfEnd: { type: Date},
  companyName: { type: String},
  role: { type: String, enum: ["Manager", "Employee", "Supervisor"]},

});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const WorkInfoModel = mongoose.model("workProcessModel", workProcessModel);
module.exports =  WorkInfoModel;
