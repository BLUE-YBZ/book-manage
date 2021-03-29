import { defineComponent, reactive } from 'vue';
import { book } from '../../../service/index';
import { message } from 'ant-design-vue';
import { result, clone } from '../../../helpers/utils/index';

const defaultFormData = {
    name: '',
    price: 0,
    author: '',
    publishDate: 0,
    classify: '',
};
export default defineComponent({
    props: {
        show:Boolean,
    },
    // 每个表单都对应一个响应式的数据集合
    // 在组件被初始化时执行
    setup(props, context) {
        console.log(props);
        const addForm = reactive(clone(defaultFormData));

        const submit = async () => {
            // 完成对内容的一份深拷贝
            const form = clone(addForm);
            form.publishDate = addForm.publishDate.valueOf();
            const res = await book.add(form);
            result(res)
            .success((d, { data }) => {
                // assign 浅拷贝，参数1是目标对象，参数2是源对象，作用是将源对象中所有可枚举的属性，复制到目标对象中。
                // 这里用这个方式可以让 显示出的文本框清空
                Object.assign(addForm,  defaultFormData);
                message.success(data.msg);
            });
            
        };
        const close = () => {
            // 触发自定义事件，子组件操作父组件的某个内容
            // context.emit('setShow',false);
            // 这里选择使用v-model进行绑定，更新 show 这个属性为false
            context.emit('update:show',false);
        };

       
        return {
            addForm,
            submit,
            props,
            close
        };
    },

});