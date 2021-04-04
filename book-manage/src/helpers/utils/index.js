import { message } from 'ant-design-vue';

export const result = (response, authShowErrorMsg = true) => {
    console.log(response);
    const {data} = response;
    if ((data.code === 0) && authShowErrorMsg) {
        message.error(data.msg);
    }
    return {
        success(cb) {
            if (data.code !== 0) {
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
// 完成一个深拷贝
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
// 将时间戳格式化为正常的数据值
export const formatTimestamp = (ts) => {
    const date = new Date(Number(ts));// 将ts时间戳转成数字
    const YYY = date.getFullYear();
    const MM = date.getMonth() + 1;// 这个获取的月计数是从零开始的需要加一
    const DD = date.getDate();

    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    return `${YYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
}