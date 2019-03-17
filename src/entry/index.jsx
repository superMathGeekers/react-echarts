import moment from 'moment';

if (module.hot) {
    module.hot.accept();
    if (process.env.NODE_ENV != 'production') {
        console.log(`%c 本地开发环境热更新运行正常 %c ${moment().format(`YYYY-MM-DD HH:mm:ss`)}`, 'background:#333;color:white', 'color:red');
    }
}
if (process.env.NODE_ENV == 'production') {
    console.log('%c MathsGeeker', 'color: #283442; background: -webkit-linear-gradient(orange, green);background: -o-linear-gradient(orange, green);background: -moz-linear-gradient(orange, green);background: linear-gradient(orange, green); font-size: 24px;');
}

require('babel-polyfill');
if (!window.Promise) {
    require('es6-promise').polyfill();
} else if (!window.fetch) {
    require('whatwg-fetch');
}
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
// import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';

import RootReducer from '../reducers/index';

import { Layout, Menu, Breadcrumb, Icon, Avatar, Button, notification } from 'antd';
notification.config({ top: 100, });
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import style from './style.less';
window.addEventListener('error', (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) => {
    console.table({
        errorMessage: errorMessage,
        scriptURI: scriptURI,
        lineNumber: lineNumber,
        columnNumber: columnNumber,
        errorObj: errorObj,
    });
});
const store = createStore(
    combineReducers(RootReducer),
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            // createLogger()
        )
    )
);

import Test from '../views/test/index';


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>hello world, show demo here</h1>
                <br />
                <Provider store={store}>
                    <div>
                        <Test />
                    </div>
                </Provider>
            </div>
        )
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));