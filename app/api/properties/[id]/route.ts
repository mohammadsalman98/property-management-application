import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Fields } from "@/types/types";
import getSessionUser from "@/utils/getSessionUser";
import { getStringValue } from "@/utils/getStringValue";
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

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;
    const { id } = params;
    const existingProperty = await Property.findById(id);

    // Check if the user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const formData = await request.formData();
    const amenitiesValues = formData.getAll("amenities");
    const amenities: string[] = amenitiesValues.map((entry) => {
      if (typeof entry === "string") {
        return entry; // Value is already a string
      }
      if (entry instanceof File) {
        return entry.name; // Extract file name from File object
      }
      return ""; // Fallback: return an empty string
    });

    const propertyData: Fields = {
      type: getStringValue(formData.get("type")),
      name: getStringValue(formData.get("name")),
      description: getStringValue(formData.get("description")),
      location: {
        street: getStringValue(formData.get("location.street")),
        city: getStringValue(formData.get("location.city")),
        state: getStringValue(formData.get("location.state")),
        zipcode: getStringValue(formData.get("location.zipcode")),
      },
      beds: getStringValue(formData.get("beds")),
      baths: getStringValue(formData.get("baths")),
      square_feet: getStringValue(formData.get("square_feet")),
      amenities,
      rates: {
        weekly: getStringValue(formData.get("rates.weekly")),
        monthly: getStringValue(formData.get("rates.monthly")),
        nightly: getStringValue(formData.get("rates.nightly")),
      },
      seller_info: {
        name: getStringValue(formData.get("seller_info.name")),
        email: getStringValue(formData.get("seller_info.email")),
        phone: getStringValue(formData.get("seller_info.phone")),
      },
      // images: [],
      owner: userId as string,
    };

    await Property.findByIdAndUpdate(id, propertyData);

    return new Response("Property Updated", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
