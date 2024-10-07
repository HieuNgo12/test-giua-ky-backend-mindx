const mongoose = require("mongoose");
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const personalInfo = new mongoose.Schema({
  fullName: { type: String },
  dateOfBirth: { type: String },
  birthPlace: { type: String },
  nationality: { type: String},
  academicProcess: { type: String },
  pesronalInfoId: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Make sure this line is correct

    ref: "user",
  },
});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const PersonalInfoModel = mongoose.model("personalInfo", personalInfo);
module.exports =  PersonalInfoModel;
