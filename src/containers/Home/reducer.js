import Storage from '@src/Storage';
const initialState = {
    isLogin: false,
    userInfo: null
};

const app = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'loginSuccess':
            Storage.save({
                key: 'userInfo', // Note: Do not use underscore("_") in key!
                data: JSON.stringify(action.data)
            });
            return {
                ...state,
                userInfo: action.data,
                isLogin: true
            }
        case 'logout':
            Storage.remove({
                key: 'userInfo', // Note: Do not use underscore("_") in key!
            });
            return {
                ...state,
                isLogin: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default app;