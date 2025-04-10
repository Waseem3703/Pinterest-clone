import { Link, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { UserData } from "../context/UserContext";
import { FaRegEdit } from "react-icons/fa";



const PinPage = () => {

    const [edit, SetEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [pinValue, setPinValue] = useState("");



    const editHandler = () => {
        setTitle(pin.title);
        setPinValue(pin.pin);
        SetEdit(!edit);
    }

    const updateHandler = () =>{
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
                            <div className="w-full md:w-1/2 p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    {
                                        edit ?
                                            (<input value={title} onChange={(e) => setTitle(e.target.value)}
                                                className="css-for-input"
                                                style={{ width: "200px" }}
                                                placeholder="Enter a New Title" />
                                            ) : (
                                                <h1 className="text-2xl font-bold">{pin.title}</h1>)
                                    }

                                    {
                                        pin.owner && pin.owner._id === user._id &&
                                        <button className="cursor-pointer" onClick={editHandler}>
                                            <FaRegEdit />
                                        </button>
                                    }

                                    {
                                        pin.owner && pin.owner._id === user?._id &&
                                        <button className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg shadow-md transition-all duration-300">
                                            <MdDelete size={20} />
                                            <span>Delete</span>
                                        </button>
                                    }
                                </div>

                                {
                                    edit ?
                                        (
                                        <input value={pinValue} onChange={(e) => setPinValue(e.target.value)}
                                            className="css-for-input"
                                            style={{ width: "200px" }}
                                            placeholder="Enter a New Description" />
                                        ) : (
                                        <p className="mb-6">{pin.pin} </p>
                                )}
                                {
                                    edit && <button className="bg-red-500 text-white py-1 px-3
                                    mb-2 mt-2 w-[200px]"
                                    onClick={updateHandler}
                                    >Update
                                        </button>
                                }

                                {pin.owner && (
                                    <div className="flex items-center border-b pb-4 mb-4">
                                        <Link to={`/user/${pin.owner._id}`} className="flex items-center space-x-4">
                                            <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700 shadow-md">
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
                                    <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center
                             text-lg font-bold text-gray-700 shadow-md">
                                        {pin.owner && pin.owner.name.slice(0, 1)}
                                    </div>

                                    <form className="flex-1 flex items-center space-x-3 ml-4">
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-700 
                                    focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-all"
                                            required />

                                        <button
                                            type="submit"
                                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4
                                     rounded-lg shadow-md transition-all duration-300"
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
