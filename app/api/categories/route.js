import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    const { title, image } = await req.json();

    const uploaded = await cloudinary.uploader.upload(image, {
      folder: "categories",
    });

    const newCategory = await Category.create({
      title,
      image: uploaded.secure_url,
      public_id: uploaded.public_id,
    });

    return Response.json(newCategory);
  } catch (err) {
    console.log("POST CATEGORY ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return Response.json(categories);
  } catch (err) {
    console.log("GET CATEGORY ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
