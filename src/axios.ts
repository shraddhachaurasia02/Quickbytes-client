import axios from "axios";

const API = axios.create({
   baseURL: "https://quickbytes-server-obaw.onrender.com/",
  timeout: 10000,
});

export default API;
