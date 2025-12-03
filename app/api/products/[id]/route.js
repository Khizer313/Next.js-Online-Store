import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req, context) {
  try {
    await connectDB();

    // Unwrap params correctly
    const { id } = await context.params; // ✅ await needed

    const product = await Product.findById(id);
    if (!product)
      return Response.json({ error: "Product not found" }, { status: 404 });

    // Delete image from Cloudinary if exists
    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    // Delete product from DB
    await Product.findByIdAndDelete(id);

    return Response.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE PRODUCT ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
