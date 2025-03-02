import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг оруулах"],
  },
  description: {
    type: String,
    default: null,
  },
  types: {
    type: String,
    default: null,
  },
  images: [
    {
      type: String,
      default: null,
    },
  ],
  publicIds: [
    {
      type: String,
      default: null,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Project = models.Project || model("Project", projectSchema);

export default Project;
