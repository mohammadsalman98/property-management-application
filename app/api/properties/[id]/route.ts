import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextApiRequest } from "next";

export const GET = async (
  request: NextApiRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) return new Response("Property Not Found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
