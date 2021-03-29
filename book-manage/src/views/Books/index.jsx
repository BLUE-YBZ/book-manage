import { defineComponent, ref, onMounted, createVNode } from 'vue';
import addOne from './AddOne/index.vue';
import { book } from '../../service/index'
import { result, formatTimestamp } from '../../helpers/utils/index';
import { message, Modal, Input } from 'ant-design-vue';
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
                title: '库存',
                slots:{
                    customRender: 'count',
                },
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
            {
                title: '操作',
                slots: {
                    customRender: 'action',
                }
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
        const keyword = ref('');
        const isSearch = ref(false);// 为true 时表示，处在搜索状态，“返回”框显示
        // 获取书籍列表
        const getList =async () => {
            const res = await book.list({
                page: curPage.value,
                size: 3,
                keyword: keyword.value,
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
        // 搜索书名对应的记录
        const onSearch = () => {
            getList();
            isSearch.value = keyword.value; // 隐式转换
        };
        // 回到全部列表
        const backAll = () => {
            // 定义keyWord为空，清空搜索内容，让页面能显示全部
            keyword.value="";
            getList();
            isSearch.value = false;
        };
        // 删除一本书
        const remove =async ({text:record}) => {
            const { _id } = record;
            const res = await book.remove(_id);
            result(res)
            .success((msg) => {
                message.success(msg);
                // 实现从显示列表中删除某条数据，可以用以下两种方式，其一，找到要删除的内一个从渲染数据组中删除，其二，每次操作完自动重查渲染。
                // const idx = list.value.findIndex((item) => {
                //     return itemProps._id === _id;
                // });
                // list.value.splice(idx,1);
                getList();
            });
        };

        const updateCount = (type, record) => {
            let word = "增加";
            if(type == 'OUT_COUNT') {
                word = '减少';
            }
            // 消息提示框
            Modal.confirm({
                title: `要${word}多少库存`,
                // 创建虚拟结点的方式，向消息框中添加内容
                // content: createVNode('div', {id:'abc'},['input']),
                content: (
                    <div><Input class="__book_input_count"/></div>
                    // jsx 被广泛应用于 react代码当中，由于vue中集成有可以解析的包，
                    // 因此，可以将 jsx 解析为 vnode，但是要使用这种类型的代码，得将文件后缀改成jsx形式 
                ),
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count');
                    let num = el.value;
                    const res = await book.updateCount({
                        id: record._id,
                        num,
                        type,
                    });
                    result(res)
                    .success((data) => {
                       
                        if (type === type.IN) {
                            //入库操作
                            num = Math.abs(num);
                        } else {
                            // 出库
                            num = -Math.abs(num);
                        }
                        const one = list.value.find((item)=> {
                            return item._id === record._id;
                        });
                        if(one) {
                            one.count = one.count + num;
                            message.success(`成功${word} ${Math.abs(num)}本书`);
                        }
                        getList();
                    });
                    
                },

            });
        };
        return {
            // 返回模板上会用到的方法和数据
            columns,
            data,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            updateCount
        };
    }
});