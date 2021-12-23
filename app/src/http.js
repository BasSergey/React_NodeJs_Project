//! файл для работы с фронтом 

import axios from "axios"; 
 
export default axios.create({ 
    baseURL: "http://localhost:5050", 
    headers: { 
      "Content-Type": "application/json", 
    }, 
    withCredentials: true, 
  });