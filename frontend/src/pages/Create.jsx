import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

const Create = () => {
  const inputRef = useRef(null);

  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const addPin = (e) => {
    e.preventDefault();
    console.log({ file, title, pin });
    // Here you'd send data to backend
  };

  return (
    <div className="flex justify-center items-start mt-10 px-4">
      <form 
        onSubmit={addPin}
        className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Image Upload Section */}
        <div className="flex flex-col items-center">
          {filePrev ? (
            <img
              src={filePrev}
              alt="Preview"
              className="mb-4 rounded-md w-full max-h-64 object-cover"
            />
          ) : (
            <div
              onClick={handleClick}
              className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-gray-300 cursor-pointer rounded-lg"
            >
              <input
                ref={inputRef}
                onChange={changeFileHandler}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <div className="w-12 h-12 mb-2 flex items-center justify-center bg-gray-200 rounded-full">
                <FaPlus />
              </div>
              <p className="text-gray-500">Click to upload an image</p>
              <p className="text-xs text-gray-400">Max size: 10MB</p>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Pin/Description Input */}
        <div>
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <input
            id="pin"
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add +
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
