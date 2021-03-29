import { defineComponent, ref, onMounted } from 'vue';
import addOne from './AddOne/index.vue';
import { book } from '../../service/index'
import { result, formatTimestamp } from '../../helpers/utils/index';

export default defineComponent({
    components: {
        'add-one': addOne,
    },
    setup() {

        // 声明变量
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '出版日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                }
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },

        ];
        const data = [
            {
                key: '1',
                ID: '02185036',
                name: '刘佳欣',
            },
            {
                key: '2',
                ID: '02185036',
                name: '刘佳欣',
            }
        ];
        const show = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);

        const getList =async () => {
            const res = await book.list({
                page: curPage.value,
                size: 3,
            });
            
            result(res)
            .success(({data}) => {
                const {list: l, total: t } =data;
                list.value = l;
                total.value = t;
            });
        };
        onMounted(async () => {
            getList();
            
        });
        // 页面发生改变时调用
        const setPage = (page) => {
            curPage.value = page;
            getList()
        };
        return {
            // 返回数据
            columns,
            data,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage
        };
    }
});