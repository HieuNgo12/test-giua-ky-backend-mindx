const mongoose = require("mongoose");
// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const personalProject = new mongoose.Schema({
  projectName: { type: String },
  projectContent: { type: String },
  projectRole: { type: String, enum: ["Developer", "Tester"] },
  projectId: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Make sure this line is correct
    ref: "user",
  },
});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const PersonalProject = mongoose.model("personalProject", personalProject);
module.exports = PersonalProject;
