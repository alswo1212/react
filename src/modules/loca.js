// 초기 상태값
const initialState = {
    path: "/",
};
export const HOME = "/"
export const LOGIN = "/user"
// 리듀서
const setLocation = (state = initialState, action) => {
    switch (action.type) {
        case HOME:
            return { path: HOME }
        case LOGIN:
            return { path: LOGIN }
        default:
            return state;
    }
};

export const home = () => ({ type: HOME })
export const login = () => ({ type: LOGIN })

// 모듈파일에서는 리듀서를 export default 한다.
export default setLocation;