import connectDB from "@/config/database";
import Property from "@/models/Property";
import getSessionUser from "@/utils/getSessionUser";
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

export const DELETE = async (
  request: NextApiRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    if (!propertyId || !sessionUser?.userId) {
      return new Response("user Id is required ", { status: 404 });
    }
    const { userId } = sessionUser;
    await connectDB();
    const property = await Property.findById(propertyId);
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    await property.deleteOne();
    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
