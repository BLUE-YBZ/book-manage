import { defineComponent, reactive } from 'vue';
import { user } from '../../../service/index';
import { message } from 'ant-design-vue';
import { result, clone } from '../../../helpers/utils/index';

const defaultFormData = {
    accound: '',
    password: '',
};
export default defineComponent({
    props: {
        show: Boolean,
    },
    // 每个表单都对应一个响应式的数据集合
    // 在组件被初始化时执行
    setup(props, context) {
        console.log(props);
        const addForm = reactive(clone(defaultFormData));
        const close = () => {
            // 触发自定义事件，子组件操作父组件的某个内容
            // context.emit('setShow',false);
            // 这里选择使用v-model进行绑定，更新 show 这个属性为false
            context.emit('update:show', false);
        };
        const submit = async () => {
            // 完成对内容的一份深拷贝
            const form = clone(addForm);

            const res = await user.add(form.accound, form.password);
            result(res)
                .success((d, { data }) => {
                    // assign 浅拷贝，参数1是目标对象，参数2是源对象，作用是将源对象中所有可枚举的属性，复制到目标对象中。
                    // 这里用这个方式可以让 显示出的文本框清空
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg);
                    close();
                    context.emit('getList')
                });

        };
        


        return {
            addForm,
            submit,
            props,
            close,
        };
    },

});