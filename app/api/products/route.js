import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    await connectDB();
    const { title, desc, price, category, image } = await req.json();

    const uploaded = await cloudinary.uploader.upload(image, { folder: "products" });

    const newProduct = await Product.create({
      title,
      desc,
      price,
      category,
      image: uploaded.secure_url,
      public_id: uploaded.public_id,
    });

    return Response.json(newProduct);
  } catch (err) {
    console.log("POST PRODUCT ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().populate("category");
    return Response.json(products);
  } catch (err) {
    console.log("GET PRODUCT ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
