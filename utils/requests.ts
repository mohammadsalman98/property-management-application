import { type PropertyData } from "@/types/types";
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties(): Promise<PropertyData[] | null> {
  try {
    const res = await fetch(`${apiDomain}/api/properties`, {
      cache: "no-cache",
    });
    if (!apiDomain) {
      return [];
    }
    if (!res.ok) throw new Error("faild to fetch the data");

    return (await res.json()) as PropertyData[];
  } catch (error) {
    console.log("Error fetching properties:", error);
    return [];
  }
}

export async function fetchProperty(id: any): Promise<PropertyData | null> {
  try {
    // Handle the case when the domain is not available yet
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/api/properties/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}
