import Hero from "@/components/Hero";
import HomePageProperties from "@/components/HomePageProperties";
import InfoBoxes from "@/components/InfoBoxes";

// import connectDB from "@/config/database";

export default async function HomePage() {
  // await connectDB();
  // console.log(process.env.MONGODB_URI, "*");

  return (
    <main className="text-center ">
      <Hero />
      <InfoBoxes />
      <HomePageProperties />
    </main>
  );
}
