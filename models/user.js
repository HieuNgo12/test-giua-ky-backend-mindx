const mongoose = require("mongoose");
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const userSchema = new mongoose.Schema({
  userId: { type: String },
  personalInfo: { type: String, ref: "personalInfo" },
  workInfo: { type: String, ref: "workinfo" },
  additionalInfo: { type: String, ref: "additionalInfo" },
  username: { type: String },
  password: { type: String },
});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
