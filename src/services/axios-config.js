import axios from "axios";
import { basr_url } from "./../utils/config";

const axiosInstance = axios.create({
    baseURL: basr_url.dev,
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    // },
});


export default axiosInstance;