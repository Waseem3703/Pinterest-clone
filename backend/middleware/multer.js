import multer from "multer";

const storage = multer.memoryStorage();
const UploadFile = multer({ storage }).single("file");

export default UploadFile;
