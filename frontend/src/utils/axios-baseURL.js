import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5000",
  // baseURL: "https://adorable-hospital-gown-moth.cyclic.app",
  baseURL: "https://amazon-backend-7tnl.onrender.com",
});
export default instance;
