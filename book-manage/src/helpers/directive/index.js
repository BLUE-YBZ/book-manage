import {isAdmin} from '../character/index';


export const regDirectives = (app) => {
    app.directive('only-admin', {
        // binding参数是自定义指令传入的参数值 相当于 value=true（权限判断）
        // value 为 true表示当前权限是仅管理员才有的
        mounted(el, { value = true } ) {
            const res = isAdmin(); // 布尔值，如果是true,表示是管理员(角色判断)
            // console.log(el); // 获取实际的DOM 节点
            if(!res && value) {
                el.style.display = 'none';
            }
        },
    });
}