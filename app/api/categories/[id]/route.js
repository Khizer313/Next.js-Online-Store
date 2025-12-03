import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req, context) {
  try {
    await connectDB();

    // unwrap params
    const { id } = await context.params; // <-- important fix

    const category = await Category.findById(id);
    if (!category)
      return Response.json({ error: "Category not found" }, { status: 404 });

    // delete from Cloudinary
    if (category.public_id) {
      await cloudinary.uploader.destroy(category.public_id);
    }

    // delete from DB
    await Category.findByIdAndDelete(id);

    return Response.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log("DELETE CATEGORY ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
