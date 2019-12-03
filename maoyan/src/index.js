import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios"
import store from "./store"
import {
    Provider
} from "react-redux"
import {
    BrowserRouter as Router,
} from "react-router-dom"
//请求地址拦截,设置允许跨域
axios.interceptors.request.use(config=>{
    if(config.url.substr(0,6) === "/login")
        config.url = "/login" + config.url;
    else
    config.url = "/maoyan"+config.url;
    return config;
})
axios.interceptors.response.use(({data})=>{
    return data;
})
React.Component.prototype.$axios = axios;
ReactDOM.render(<Router><Provider store={store}><App /></Provider></Router>, document.getElementById('root'));

serviceWorker.unregister();
