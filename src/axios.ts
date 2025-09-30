import axios from "axios";

const API = axios.create({
   baseURL: "http://localhost:4001/",
  // baseURL: "https://snapmeal-server.vercel.app/",
  timeout: 10000,
});

export default API;
