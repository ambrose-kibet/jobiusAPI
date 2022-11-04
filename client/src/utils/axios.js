import axios from "axios";
const customFetch = axios.create({
  baseURL: "https://jobius.onrender.com/api/v1",
});
export default customFetch;
