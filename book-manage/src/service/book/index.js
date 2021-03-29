import axios from 'axios';
export const add = (form) => {
    // 这个请求路径对应后端的的设置
    return axios.post('http://localhost:3000/book/add',form);
        
};

export const list = (data) => {
    return axios.get(
        'http://localhost:3000/book/list',
        {
            params:data,
        },
    );
};