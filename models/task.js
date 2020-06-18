const mongoose = require("mongoose");

const schema = mongoose.Schema;

const taskSchema = new schema({
  label: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  actualEndDate: { type: String, default: '' },
  locked: { type: Boolean, default: false },
  userId: { type: String, required : true },
  projectId: { type: String, required : true },
  subCategoryId: { type: String, required : true },
  projectName: { type: String, required : true },
  subCategoryName: { type: String, required : true },
});

module.exports = mongoose.model("tasks", taskSchema);
