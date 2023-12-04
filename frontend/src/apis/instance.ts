import axios from "axios";

const instance = axios.create({
  baseURL: "https://port-0-lol-analyze-32updzt2alpqds9zr.sel4.cloudtype.app",
  timeout: 10000,
});

export default instance;