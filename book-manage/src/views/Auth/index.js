import { defineComponent, reactive} from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '../../service/index';
import { result } from '../../helpers/utils/index';
import { message } from 'ant-design-vue';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';
import {useRouter } from 'vue-router';
import { setToken } from '../../helpers/token';

// defineComponent 是为了帮助我们编写代码时给与提示
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined,
  },
  setup() {
    const router = new useRouter();
    // 注册 表单数据
    const regForm = reactive({
      // reactive 可以将其声明的对象，看成是响应式的数据
      account: '',
      password: '',
      inviteCode: '',
    });
    // 注册逻辑
    const register = async () => {
      if (regForm.account === '') {
        message.info('请输入账户');
        return;
      }
      if (regForm.password === '') {
        message.info('请输入密码');
        // 提示之后要暂停程序执行
        return;
      }
      if (regForm.inviteCode === '') {
        message.info('请输入邀请码');
        // 提示之后要暂停程序执行
        return;
      }
      //  res 即response
      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode);
      // 在服务端设置的 code=0 表示失败，code=1 为成功
      // 所有的提示信息都由服务端来提供
      result(res).
      success(({msg}) => {
        message.success(msg);
      });
    };
    // 登录表单
    const loginForm = reactive({
      account: '',
      password: '',
    })
    // 登录逻辑
    const login = async () => {
      if (loginForm.account === '') {
        message.info('请输入账户');
        return;
      }
      if (loginForm.password === '') {
        message.info('请输入密码');
        // 提示之后要暂停程序执行
        return;
      }
      const res = await auth.login(loginForm.account, loginForm.password);
      console.log(res);
      result(res)
      .success(({msg, data:{user, token}}) => {
        message.success(msg);
        // 调用store中的方法
        store.commit('setUserInfo',user);
        store.commit('setUserCharacter',getCharacterInfoById(user.character));
        setToken(token);
        router.replace('/books'); // 这样的进入方式是没有办法回退页面的
      });
    };
    return {
      // 注册
      regForm,
      register,
      // 登录
      loginForm,
      login,
    };
  },
});