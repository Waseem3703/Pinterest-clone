import DataURIParser from "datauri/parser.js";
import path from "path"

const getDataUrl = (file) => {
    return {
        content: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    };
};

export default getDataUrl;

