"use client";

import { PropertyData } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Spinner from "@/components/Spinner";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaPaperPlane,
  FaBookmark,
  FaShare,
  FaMapMarker,
  FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import PropertyImages from "@/components/PropertyImages";

export default function page() {
  const { id }: { id: string } = useParams();

  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("b.fetching");

    async function fetchPropertyData() {
      if (!id) return;
      try {
        const currentProperty = await fetchProperty(id);
        setProperty(currentProperty);
        console.log(currentProperty); //not responded
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    }
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10 min-h-dvh">
        Property Not Found
      </h1>
    );
  }
  // {
  //   /* {loading && <Spinner loading={loading} />} */
  // }
  return (
    <>
      {loading ? (
        <div className="min-h-dvh">
          <Spinner loading={loading} />
        </div>
      ) : (
        property && (
          <>
            <PropertyHeaderImage image={property.images[0]} />
            <section>
              <div className="container m-auto py-6 px-6">
                <Link
                  href="/properties"
                  className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                  <i className="fas fa-arrow-left mr-2"></i> Back to Properties
                </Link>
              </div>
            </section>
            <section className="bg-violet-200">
              <div className="container m-auto py-10 px-6">
                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                  <main>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                      <div className="text-gray-500 mb-4">{property.type}</div>
                      <h1 className="text-3xl font-bold mb-4">
                        {property.name}
                      </h1>
                      <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                        <FaMapMarker className="text-orange-700 mr-2 text-lg" />
                        <p className="text-orange-700">
                          {property.location.street}, {property.location.city}{" "}
                          {property.location.state}
                        </p>
                      </div>

                      <h3 className="text-lg font-bold my-6 bg-violet-950 text-white p-2">
                        Rates & Options
                      </h3>
                      <div className="flex flex-col md:flex-row justify-around">
                        <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                          <div className="text-gray-500 mr-2 font-bold">
                            Nightly
                          </div>
                          <div className="text-2xl font-bold">
                            {property.rates.nightly ? (
                              `$${property.rates.nightly.toLocaleString()}`
                            ) : (
                              <FaTimes className="text-red-700" />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                          <div className="text-gray-500 mr-2 font-bold">
                            Weekly
                          </div>
                          <div className="text-2xl font-bold text-blue-500">
                            {property.rates.weekly ? (
                              `$${property.rates.weekly.toLocaleString()}`
                            ) : (
                              <FaTimes className="text-red-700" />
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                          <div className="text-gray-500 mr-2 font-bold">
                            Monthly
                          </div>
                          <div className="text-2xl font-bold text-blue-500">
                            {property.rates.monthly ? (
                              `$${property.rates.monthly.toLocaleString()}`
                            ) : (
                              <FaTimes className="text-red-700" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-lg font-bold mb-6">
                        Description & Details
                      </h3>
                      <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                        <p>
                          <FaBed className="inline-block mr-2" />{" "}
                          {property.beds}{" "}
                          <span className="hidden sm:inline">Beds</span>
                        </p>
                        <p>
                          <FaBath className="inline-block mr-2" />{" "}
                          {property.baths}{" "}
                          <span className="hidden sm:inline">Baths</span>
                        </p>
                        <p>
                          <FaRulerCombined className="inline-block mr-2" />
                          {property.square_feet}{" "}
                          <span className="hidden sm:inline">sqft</span>
                        </p>
                      </div>
                      <p className="text-gray-500 mb-4">
                        {property.description}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                      <h3 className="text-lg font-bold mb-6">Amenities</h3>

                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
                        {property.amenities.map((amenity, index) => (
                          <li key={index}>
                            <FaCheck className="inline-block mr-2 text-green-600" />
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <div id="map"></div>
                  </div> */}
                  </main>

                  {/* <!-- Sidebar --> */}
                  <aside className="space-y-4">
                    <div>
                      <button className="bg-violet-900 hover:bg-violet-950 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                        <FaBookmark className="mr-2" />
                        Bookmark Property
                      </button>
                    </div>
                    <div>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                        <FaShare className="mr-2" /> Share Property
                      </button>
                    </div>

                    {/* <!-- Contact Form --> */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-6">
                        Contact Property Manager
                      </h3>
                      <form
                        action="mailto:support@traversymedia.com"
                        method="post"
                        encType="text/plain"
                      >
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                          >
                            Email:
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="message"
                          >
                            Message:
                          </label>
                          <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                            id="message"
                            placeholder="Enter your message"
                          ></textarea>
                        </div>
                        <div>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                            type="submit"
                          >
                            <FaPaperPlane className="mr-2" /> Send Message
                          </button>
                        </div>
                      </form>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
            <PropertyImages images={property.images} />
          </>
        )
      )}
    </>
  );
}
