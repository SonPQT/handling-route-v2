import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Please provide slug"],
    unique: [true, "Slug Exist"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description!"],
  },
});

export default mongoose.models.Posts || mongoose.model("Posts", PostSchema);