import axios from 'axios';
const baseURL = "https://localhost:7062/";

export default axios.create({
    baseURL : baseURL
})

export const axiosPrivate = axios.create({
    baseURL : baseURL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true

})