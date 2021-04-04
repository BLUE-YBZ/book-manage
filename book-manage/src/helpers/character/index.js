import store from '@/store';
export const getCharacterInfoById = (id) => {
    const { characterInfo } = store.state;
    const one = characterInfo.find((item) => {
        return item._id === id;
    });

    // if (one) {
    //     return one;
    // }
    // return {
    //     title: '位置角色'
    // }
    return one || {
        title: '未知角色',
    };
};
// 判断是否是管理员
export const isAdmin = () => {
    const uc = store.state.userCharacter;
    return uc.name === 'admin';
    // console.log(uc);
} ;