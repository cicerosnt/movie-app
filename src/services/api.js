//https://api.themoviedb.org/3/movie/550?api_key=446bd033d32843eecea2bd35230d4adb

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3"
  
});

export default api;