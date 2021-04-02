import { defineComponent, ref, onMounted } from 'vue';
import { user } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import AddOne from './AddOne/index.vue';
export default defineComponent({
    components: {
        'add-one': AddOne
    },
    setup() {
        const show = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const columns = [
            {
                title: '账户',
                dataIndex: 'account',
            },
            {
                title: '创建日期',
                slots: {
                    customRender: 'createdAt',
                },
            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions',
                },
            }
        ]
        //  获取用户列表
        const getUser = async () => {
            // 向后端请求数据
            const res = await user.list(curPage.value, 10, keyword.value);

            result(res)
                .success(({ data: { list: refList, total: resTotal } }) => {
                    list.value = refList;
                    total.value = resTotal;
                });
        };
        // 在页面挂载时触发
        onMounted(() => {
            getUser();
        });
        // 删除用户
        const remove = async ({ record }) => {
            const { _id } = record;
            const res = await user.remove(_id);
            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getUser();
                });
        };
        // 设置页码
        const setPage = async (page) => {
            curPage.value = page;
            getUser();
        };
        // 重置密码
        const resetPassword = async ({ record }) => {
            const { _id } = record;
            const res = await user.resetPassword(_id);
            result(res)
                .success(({msg}) => {
                    message.success(msg);
                });
        };

        const onSearch = () => {
            getUser();
            // 避免搜索框为空时，返回按钮任然存在
            isSearch.value = !!keyword.value;
        };

        const backAll =() => {
            isSearch.value = false;
            keyword.value = "";
            getUser();
        }
        return {
            list,
            total,
            curPage,
            getUser,
            columns,
            formatTimestamp,
            remove,
            show,
            setPage,
            resetPassword,
            keyword,
            isSearch,
            onSearch,
            backAll
        }
    },
});