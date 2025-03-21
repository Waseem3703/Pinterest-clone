import { Link } from "react-router-dom";

export const PinCard = ({ pin }) => {
  return (
    <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="bg-white overflow-hidden shadow-lg rounded-lg relative group cursor-pointer">
        <img
          src={pin.image.url}
          alt="Pin"
          className="w-full h-[443px] object-cover"
        />

        <div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 
          transition-opacity duration-300 flex items-center justify-center"
        >
          <Link
            to={`/pin/${pin._id}`}
            className="border border-white text-white px-6 py-2 rounded-full 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
              font-bold text-lg tracking-wide backdrop-blur-md"
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};
