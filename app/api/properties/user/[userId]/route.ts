import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextApiRequest } from "next";

// GET /api/properties/user/:userId
export const GET = async (
  request: NextApiRequest,
  { params }: { params: Params }
) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
