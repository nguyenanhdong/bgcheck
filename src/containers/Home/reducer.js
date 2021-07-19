import Storage from '@src/Storage';
const initialState = {
    isLogin:false,
    userInfo:null
};

const app = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'loginSuccess':
            return{
                ...state,
                isLogin:true
            }
        case 'logout':
            return{
                ...state,
                isLogin:false,
                userInfo:null
            }
        default:
            return state;
    }
}

export default app;