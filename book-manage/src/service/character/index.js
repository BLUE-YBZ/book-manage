import axios from 'axios';

// 请求用户权限展示列表
export const list = () => {
    return axios.get(
        'http://localhost:3000/character/list'
    );
};