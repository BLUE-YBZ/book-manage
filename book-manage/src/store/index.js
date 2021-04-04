import { createStore } from 'vuex';
import { character, user } from '@/service';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from  '@/helpers/character';

export default createStore({
  state: {
    // 数据集合
    characterInfo: {},
    userInfo: {},
    userCharacter: {},// 当前登录用户的角色
  },
  mutations: {
    // 函数集合，修改state;直接设置数据
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    },
  },
  actions: {
    // 触发函数的前置信息；设置数据之前要进行别的操作(计算、异步)
    // dispatch调用actions中的方法
    async getCharacterInfo(store) {
      const res = await character.list();
      result(res)
      .success(({data}) => {
        store.commit('setCharacterInfo', data);
      });
    },
    async getUserInfo(store) {
      const res = await user.info();
      result(res)
      .success(({data}) => {
        store.commit('setUserInfo', data);
        store.commit('setUserCharacter', getCharacterInfoById(data.character));
      });
    }
  },
  // 数据量较大时，使用其区分数据在不同模块
  // modules: {
  // },
});
