import { Link,  useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { UserData } from "../context/UserContext";
import { FaRegEdit } from "react-icons/fa";
import  ConfirmDelete  from "../components/ConfirmDelete";



const PinPage = () => {

    const { updatePin, addComment, deleteComment, deletePin } = PinData();
    const navigate = useNavigate();
    const [edit, SetEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [pinValue, setPinValue] = useState("");
    const [comment, setComment] = useState("");

{/*for the delete button*/}
const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState("");
const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});


    const editHandler = () => {
        setTitle(pin.title);
        setPinValue(pin.pin);
        SetEdit(!edit);
    }

    const updateHandler = () => {
        updatePin(pin._id, title, pinValue, SetEdit)
    }
    const SubmitHandler = (e) => {
        e.preventDefault();
        addComment(pin._id, comment, setComment);

    }

    const deleteCommentHandler = (id) => {
        setModalMessage(`Delete ${pin.comment}`);
        setOnConfirmAction(() => () => deleteComment(pin._id, id));
        setShowModal(true);
    };
    

    const deletePinHandler = () => {
        setModalMessage(`Delete "${pin.title}" Pin`);
        setOnConfirmAction(() => () => deletePin(pin._id, navigate));
        setShowModal(true);
    };
    

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
                                                className="cursor-pointer text-red-500 hover:text-red-600 text-xl transition duration-300"
                                            >
                                                <FaRegEdit />
                                            </button>
                                            <button onClick={deletePinHandler} className="cursor-pointer flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg shadow transition duration-300">
                                                <MdDelete size={18} />
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
                                        className= "cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-[250px] transition duration-300"
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

                                    <form className="flex-1 flex items-center space-x-3 ml-4" onSubmit={SubmitHandler}>
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2
                                             text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400
                                              shadow-sm"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required

                                        />
                                        <button
                                            type="submit"
                                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                                        >
                                            Add+
                                        </button>
                                    </form>
                                </div>
                                <hr className="font-bold text-gray-400 mt-3 mb-3 " />
                                <div className="overflow-y-auto h-6">
                                    {pin.comment && pin.comment.length > 0 ? (
                                        pin.comment.map((e, i) => (
                                            <div key={i} className="flex items-center justify-center mb-4">
                                                <div className="flex items-center mb-4">
                                                    <Link to={`/user/${e.user}`}>
                                                        <div className="rounded-full h-12 w-12 bg-gradient-to-tr from-red-400 to-pink-400 text-white flex items-center justify-center text-lg font-bold shadow-md">
                                                            {e.name.slice(0, 1)}
                                                        </div>
                                                    </Link>
                                                    <div className="ml-4">
                                                        <h2 className="text-lg font-semibold text-gray-800">{e.name}</h2>
                                                        <p className="text-gray-500">{e.comment}</p>
                                                    </div>
                                                </div>
                                                {e.user === user._id && (
                                                    <button onClick={()=>deleteCommentHandler(e._id)} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg shadow transition duration-300">
                                                        <MdDelete size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>Be the first one to add comment</p>
                                    )}

                                </div>
                            </div>
                        </div>
                    )}


                </div>
            )}
               {showModal && (
        <ConfirmDelete
            message={modalMessage}
            onConfirm={() => {
                onConfirmAction();
                setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
        />
    )}
        </div>
    );
};

export default PinPage;
