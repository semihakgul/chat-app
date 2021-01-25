import axios from "axios"
import { response } from "express";

export const getData = (path) => {

    axios.get(path)
      .then(response => {
        return {status: response.status, data:response.data};
        
      })
      .catch(error => {
        return {status: 400, error:error}
      });

};