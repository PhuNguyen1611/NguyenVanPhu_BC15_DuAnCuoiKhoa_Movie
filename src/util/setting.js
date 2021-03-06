import axios from 'axios';

export const DOMAIN = 'https://movienew.cybersoft.edu.vn'
export const KEY_TOKEN_CYBERSOFT = 'TokenCybersoft';
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNSIsIkhldEhhblN0cmluZyI6IjIwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NTY4MzIwMDAwMCIsIm5iZiI6MTYyNjI4MjAwMCwiZXhwIjoxNjU1ODMwODAwfQ.p47FFJpArherjwlM71xTzdulAQIW37pR6fRGD3t3Ji0'
export const GROUP_ID = 'GP01'
export const USER_LOGIN = 'USER_LOGIN'
export const ACCESS_TOKEN = 'ACCESS_TOKEN';

//Cấu hình interceptor cho axios (Tất cả request gọi = axios đều được cấu hình) (1 dự án làm 1 duy nhất)
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 60000,
});

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),  //Token mà người dùng đăng nhập (401 token không hợp lệ, 403 không đủ quyền truy cập)
        [KEY_TOKEN_CYBERSOFT]: TOKEN_CYBERSOFT //qui định của cybersoft tất cả mọi request

    }
    return config;
}, (errors) => {
    return Promise.reject(errors)
})
