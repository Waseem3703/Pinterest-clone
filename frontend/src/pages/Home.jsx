import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { PinCard } from "../context/PinCard";
import { Helmet } from "react-helmet";

const Home = () => {
  const { pins, loading } = PinData();

  return (
    <div>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Pinterest Home Page</title>
        <meta name="description" content="View the pins, follow users, and explore images on the Pinterest clone homepage." />
        <meta name="keywords" content="Pinterest, pins, image sharing, home, gallery" />
      </Helmet>

      {/* Main Content */}
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {Array.isArray(pins) && pins.length > 0 ? (
              pins.map((pin) => <PinCard key={pin._id} pin={pin} />)
            ) : (
              <p className="text-gray-400 text-lg">No pins yet!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
