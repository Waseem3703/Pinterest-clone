import toast from "react-hot-toast";
import { PinCard } from "../context/PinCard";
import { PinData } from "../context/PinContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { pins } = PinData();
  const { setIsAuth, setUser } = UserData();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      navigate("/login");
      setIsAuth(false);
      setUser([]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const userPins = pins?.filter((pin) => pin.owner === user._id);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-48 bg-gradient-to-r from-purple-500 to-pink-500">
          {/* Avatar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-32">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-5xl font-bold text-gray-700">
                {user.name.slice(0, 1)}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 text-center px-6">
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500 mt-1">{user.email}</p>
          <button
            onClick={logoutHandler}
            className="cursor-pointer mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white
             rounded-full text-sm transition-all shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Pins Section */}
        <div className="mt-10 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">My Pins</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {userPins && userPins.length > 0 ? (
              userPins.map((pin) => <PinCard key={pin._id} pin={pin} />)
            ) : (
              <p className="text-gray-400 text-lg">You have not uploaded any pins yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
