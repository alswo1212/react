// 초기 상태값
const initialState = {
    userName: "",
};
export const LOGIN = "LOGIN"
// 리듀서
const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { userName: action.userName }
        default:
            return state;
    }
};

export const loginType = () => ({ type: LOGIN })

// 모듈파일에서는 리듀서를 export default 한다.
export default login;