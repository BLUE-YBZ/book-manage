import axios from 'axios';

export const register = (account, password,inviteCode) =>{
    // axios 返回的内容也是一个 Promise
    axios.post('http://localhost:3000/auth/register', {
        account,
        password,
        inviteCode,
    });
};
export const login = (account, password) => {
    axios.post('http://localhost:3000/auth/login',{
        account,
        password,
    });
};