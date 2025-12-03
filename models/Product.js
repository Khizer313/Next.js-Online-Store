import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  public_id: { type: String }, // Cloudinary public_id
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
