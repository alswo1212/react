﻿import { createStore } from "redux";
import { combineReducers } from "redux";

import counter from "modules/paging";

/*
1. createStore()
스토어를 만드는 메소드(함수)
*/

/*
2. combineReducers()
리덕스는 action —> dispatch —> reducer 순으로 동작
애플리케이션이 복잡해지게 되면 reducer 부분을 여러 개로 나눠야 하는 경우가 발생
combineReducers은 여러 개의 독립적인 reducer의 반환 값을 하나의 상태 객체로 만들어줌
*/

const rootReducer = combineReducers({ counter });
const store = createStore(rootReducer);

export default store; 