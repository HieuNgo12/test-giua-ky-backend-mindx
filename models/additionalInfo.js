const mongoose = require("mongoose");
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const additionalInfo = new mongoose.Schema({
  additionalInfoId: { type: String },
  hobbies: { type: [String] },
  personalGoal: { type: [String] },
});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const AdditionalInfoModel = mongoose.model("additionalInfo", additionalInfo);
module.exports = AdditionalInfoModel;
