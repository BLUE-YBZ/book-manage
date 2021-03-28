import { message } from 'ant-design-vue';
export const result = (response, authShowErrorMsg = true) => {
    const { data } = response;
    if((data.code === 0) && authShowErrorMsg) {
        message.error(data.msg);
    }
    return {
        success(cb) {
            if (data.code !==0) {
                cb(data, response);
            }
            // this 表示当前对象，也就是包含success、fail 、finally的这个对象
            return this;
        },
        fail(cb) {
            if (data.code === 0) {
                cb(data, response);
            }
            return this;
        },
        finally(cb) {
            // 不管什么情况下，调用就会执行
            cb(data, response);
            return this;
        },
    };
};