import axios from 'axios';
import { getToken } from '@/helpers/token/index.js';

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;
export const add = (form) => {
    // 这个请求路径对应后端的的设置
    return axios.post('http://localhost:3000/book/add',form);
        
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/book/list',
        {
            params:data,
            // headers : {
            //     Authorization: `Bearer ${getToken()}`
            // },
        },
    );
};

export const remove = (id) => {
    return axios.delete(
        `http://localhost:3000/book/${id}`,
    );
};

export const updateCount = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update/count`,
        data,
    );
};

export const update = (data = {}) => {
    return axios.post(
        `http://localhost:3000/book/update`,
        data,
    )
}