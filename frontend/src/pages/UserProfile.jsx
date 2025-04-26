import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { PinCard } from "../context/PinCard";

const UserProfile = ({ user: loggedInUser }) => {
  const { pins } = PinData();
  const params = useParams();

  const [user, setUser] = useState({});
  const [isFollow, setIsFollow] = useState(false);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
      // If you want to precheck following status, you can handle here
    } catch (error) {
      console.error(error);
    }
  }

  const followHandler = () => {
    setIsFollow((prev) => !prev);
    // You can also trigger API call here to update follow/unfollow status
  };

  const userPins = pins?.filter((pin) => pin.owner === user._id);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Cover Photo */}
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {/* Avatar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-32">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
              {user.name && (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-5xl font-bold text-gray-700">
                  {user.name.slice(0, 1)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 text-center px-6">
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>

          <div className="flex justify-center items-center gap-6 mt-3">
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {user.followers ? user.followers.length : 0}
              </p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">
                {user.following ? user.following.length : 0}
              </p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
          </div>

          {/* Only show Follow button if not viewing own profile */}
          {loggedInUser?._id !== user._id && (
            <button
              onClick={followHandler}
              className="mt-5 px-8 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full shadow-md transition-all text-sm"
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        {/* My Pins Section */}
        <div className="mt-10 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {loggedInUser?._id === user._id ? "My Pins" : `${user.name?.split(" ")[0]}'s Pins`}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {userPins && userPins.length > 0 ? (
              userPins.map((pin) => <PinCard key={pin._id} pin={pin} />)
            ) : (
              <p className="text-gray-400 text-lg">No pins yet!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
