import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    public_id: { type: String, required: true }, // Cloudinary public_id
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
