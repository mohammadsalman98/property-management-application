// import connectDB from "@/config/database";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { request } from "http";

export const GET = async (request: Request): Promise<Response> => {
  try {
    await connectDB();
    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    console.log(formData);
    const amenities = formData.getAll("amenities");
    const images: FormDataEntryValue[] = formData
      .getAll("images")
      .filter(
        (image): image is File => image instanceof File && image.name !== " "
      );
    console.log(images);
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add property", { status: 500 });
  }
};
