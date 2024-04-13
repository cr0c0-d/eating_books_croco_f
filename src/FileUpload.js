import axios from "axios";
async function FileUpload({ file, type }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  const axiosResponse = await axios({
    url: `${process.env.REACT_APP_API_ROOT}` + "/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
}

export default FileUpload;
