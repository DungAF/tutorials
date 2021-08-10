import axios from "axios";

export default axios.create({
  baseURL: "http://05207ab90e0c.ngrok.io/api/",
  headers: {
    "Content-type": "application/json"
  }
});