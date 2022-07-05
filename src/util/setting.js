import axios from "axios";

export const TOKEN_MOVIE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNSIsIkhldEhhblN0cmluZyI6IjE1LzA5LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2MzIwMDAwMDAwMCIsIm5iZiI6MTYzNDgzNTYwMCwiZXhwIjoxNjYzMzQ3NjAwfQ.uVU26Zzhj9Tt11v92mEFOSGk1Ow-on5dWy9q9vuSVt4'
export const GROUP_ID = 'GP03';

let accessToken = '';
if (localStorage.getItem('TOKEN_MOVIE')) {
  accessToken = localStorage.getItem('TOKEN_MOVIE');
}

export const http = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn',
  timeout: 3000 
})
http.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "TokenCybersoft": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNSIsIkhldEhhblN0cmluZyI6IjE1LzA5LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2MzIwMDAwMDAwMCIsIm5iZiI6MTYzNDgzNTYwMCwiZXhwIjoxNjYzMzQ3NjAwfQ.uVU26Zzhj9Tt11v92mEFOSGk1Ow-on5dWy9q9vuSVt4',
    "Authorization": "Bearer " + accessToken
  }
  return config
}, (err) => {
  return Promise.reject(err)
})