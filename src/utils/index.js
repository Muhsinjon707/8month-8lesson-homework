import axios from "axios";

const mainURL = "https://dummyjson.com/products";

export const axiosInstance = axios.create({
  baseURL: mainURL,
});
