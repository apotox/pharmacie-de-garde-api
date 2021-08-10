import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
const reducers = combineReducers({
    app: require("./reducers/app.reducer").default,
    notification: require("./reducers/notification.reducer").default
})

export const store = createStore(reducers,{},applyMiddleware(thunk))