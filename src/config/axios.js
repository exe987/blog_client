import axios from "axios";

const clientAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default clientAxios;
