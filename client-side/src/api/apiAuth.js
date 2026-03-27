import axios from "axios";

const apiAuth = axios.create({
  baseURL: "http://localhost:4000/api", // ganti sesuai backend kamu
});

export default apiAuth;
