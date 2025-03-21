import { Link, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { UserData } from "../context/UserContext";


const PinPage = () => {
    const { id } = useParams(); 
    const { loading, fetchPin, pin } = PinData();
    const { user } = UserData();

    useEffect(() => {
        if (id) {
            fetchPin(id); 
        }
    }, [id]);

    return (
        
        <div>
            {pin && (
                <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
                    {loading ? (
                        <Loading />
                    ) : (
                        <div
                            className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl"
                        >
                            <div
                                className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center"
                            >
                               { pin.image && <img
                                    src={pin.image?.url}
                                    alt=""
                                    className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                /> }
                            </div>
                        <div className="w-full md:w-1/2 p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold">{pin.title}</h1>

                                {
                                    pin.owner && pin.owner._id === user?._id && 
                                    <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg shadow-md transition-all duration-300">
                                      <MdDelete size={20} />
                                     <span>Delete</span>
                                    </button>
                                }
                            </div>
                            <p className="mb-6">{pin.pin}</p>
                            {
                                pin.owner && (
                                    <div className="flex items-center justify-between border-b pd-4 mb-4">
                                        <div className="flex items-center">
                                            <Link to={`/user/${pin.owner._id}`}>
                                            <div className="rounded-full h-12 w-12 bg-gray-300
                                            flex items-center justify-center">
                                                <span className="font-bold">
                                                    {
                                                        pin.owner.name.slice(0,1)
                                                    }
                                                </span>
                                            </div>
                                            </Link>
                                            <div className="ml-4">
                                                <h2 className="text-lg font-semibold">{pin.owner.name}</h2>
                                                <p className="text-gray-500">
                                                    {pin.owner.follower.length} Followers
                                                    </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PinPage;
