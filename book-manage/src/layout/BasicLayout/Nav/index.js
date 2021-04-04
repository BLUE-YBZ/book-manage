import { defineComponent, ref, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import menu from '../../../config/menu/index';



export default defineComponent({
    setup() {
        const router = useRouter(); // 路由跳转
        const route = useRoute(); // 路由信息

        const openKeys = ref([]);
        const selectedKeys = ref([]);
        const to = (url) => {
            router.push(url);
        }
        onMounted(()=>{
            selectedKeys.value = [route.path]; //确保刷新时高亮任然存在
            
        });
        return {
            openKeys, //当前展开的 SubMenu 菜单项数组
            selectedKeys,// 当前选中的菜单项
            menu,
            to,
        };
    }
})

