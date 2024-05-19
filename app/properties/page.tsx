import PropertyCard from "@/components/PropertyCard";
import { type PropertyData } from "@/types/types";
import { fetchProperties } from "@/utils/requests";
export default async function PropertiesPage() {
  const properties = await fetchProperties();
  properties?.sort(
    (a: PropertyData, b: PropertyData) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  return (
    <section className="px-4 py-6 min-h-screen">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
