import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { PinCard } from "../context/PinCard";
import { UserData } from "../context/UserContext"; // <- import UserData
import Meta from "../components/Meta"

const UserProfile = ({ user: loggedInUser }) => {
  const { pins } = PinData();
  const { followUser } = UserData(); // <- use context followUser
  const { users } = UserData();

  const params = useParams();
  const [user, setUser] = useState({});
  const [isFollow, setIsFollow] = useState(false);
  const [followLoading, setFollowLoading] = useState(false); // 🆕 New loading state


  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
  
      // 🆕 Also update the user globally inside context
      updateUserInContext(data);
  
    } catch (error) {
      console.error(error);
    }
  }
  

  const followHandler = async () => {
    try {
      setFollowLoading(true);
      await followUser(user._id);
      await fetchUser();
      setFollowLoading(false);
    } catch (error) {
      console.error(error);
      setFollowLoading(false);
    }
  };
  
  // NEW useEffect to handle follow status
  useEffect(() => {
    if (user && loggedInUser) {
      if (user.followers?.includes(loggedInUser._id)) {
        setIsFollow(true);
      } else {
        setIsFollow(false);
      }
    }
  }, [user, loggedInUser]);

  const userPins = pins?.filter((pin) => pin.owner === user._id);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null;
  const { updateUserInContext } = UserData();

  return ( 
    <>
    <Meta 
  title={`${user.name}'s Profile`} 
  description="View the user's profile and their pins." 
/>

{

}   <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Cover Photo */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
                <p className="text-lg font-semibold text-gray-800">{user.followers?.length || 0}</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-800">{user.following?.length || 0}</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            {loggedInUser?._id !== user._id && (
              <div className="flex justify-center">
                <button
                  onClick={followHandler}
                  disabled={followLoading}
                  className={`cursor-pointer mt-4 px-6 py-2 ${isFollow ? "bg-gray-400 hover:bg-gray-500" : "bg-red-500 hover:bg-red-600"} text-white rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2`}
                >
                  {followLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    isFollow ? "Unfollow" : "Follow"
                  )}
                </button>
              </div>

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
      </div></>
  );
};

export default UserProfile;
