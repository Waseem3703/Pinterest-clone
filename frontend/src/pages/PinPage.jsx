import { Link, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { UserData } from "../context/UserContext";
import { FaRegEdit } from "react-icons/fa";



const PinPage = () => {

    const { updatePin } = PinData();
    const [edit, SetEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [pinValue, setPinValue] = useState("");



    const editHandler = () => {
        setTitle(pin.title);
        setPinValue(pin.pin);
        SetEdit(!edit);
    }

    const updateHandler = () => {
        updatePin(pin._id, title, pinValue, SetEdit)
    }


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
                                {pin.image && <img
                                    src={pin.image?.url}
                                    alt=""
                                    className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                />}
                            </div>
                            <div className="w-full md:w-1/2 p-8 flex flex-col gap-4 bg-white rounded-b-lg md:rounded-r-lg md:rounded-b-none shadow-inner">
                                <div className="flex items-center justify-between">
                                    {edit ? (
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="border border-gray-300 rounded-lg px-4 py-2 w-[250px] focus:outline-none focus:ring-2 focus:ring-red-400"
                                            placeholder="Enter a New Title"
                                        />
                                    ) : (
                                        <h1 className="text-3xl font-semibold text-gray-800">{pin.title}</h1>
                                    )}

                                    {pin.owner && pin.owner._id === user._id && (
                                        <div className="flex gap-2 items-center">
                                            <button
                                                onClick={editHandler}
                                                className="text-red-500 hover:text-red-600 text-xl transition duration-300"
                                            >
                                                <FaRegEdit />
                                            </button>
                                            <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg shadow transition duration-300">
                                                <MdDelete size={18} />
                                                <span className="text-sm">Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {edit ? (
                                    <input
                                        value={pinValue}
                                        onChange={(e) => setPinValue(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-4 py-2 w-[250px] focus:outline-none focus:ring-2 focus:ring-red-400"
                                        placeholder="Enter a New Description"
                                    />
                                ) : (
                                    <p className="text-gray-700">{pin.pin}</p>
                                )}

                                {edit && (
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-[250px] transition duration-300"
                                        onClick={updateHandler}
                                    >
                                        Update
                                    </button>
                                )}

                                {pin.owner && (
                                    <div className="flex items-center space-x-4 border-b pb-4">
                                        <Link to={`/user/${pin.owner._id}`} className="flex items-center space-x-4">
                                            <div className="rounded-full h-12 w-12 bg-gradient-to-tr from-red-400 to-pink-400 text-white flex items-center justify-center text-lg font-bold shadow-md">
                                                {pin.owner.name.slice(0, 1)}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">{pin.owner.name}</h2>
                                                <p className="text-gray-500">{pin.owner.follower.length} Followers</p>
                                            </div>
                                        </Link>
                                    </div>
                                )}

                                <div className="flex items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                                    <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700 shadow-md">
                                        {pin.owner && pin.owner.name.slice(0, 1)}
                                    </div>

                                    <form className="flex-1 flex items-center space-x-3 ml-4">
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                                        >
                                            Add+
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    )}


                </div>
            )}
        </div>
    );
};

export default PinPage;
