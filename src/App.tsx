import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom'
import BrowserNavigatorFactory from "wuxp_react_dynamic_router/src/factory/navigator/web/BrowserNavigatorFactory"
import {Provider} from "react-redux";
import {ConnectedRouter} from 'react-router-redux'
import {setDefaultLoadingComponent} from "wuxp_react_dynamic_router/src/components/load/AsyncComponent";
import {antdMoiboleStore} from "./store/AntdMobileStore";
import UserLayout from "./layouts/UserLayout";
import AuthorizedRoute from "./components/route/AuthorizedRoute";
import BaseLayout from "./layouts/BaseLayout";

const history = BrowserNavigatorFactory.get();

setDefaultLoadingComponent(() => {
    return <div>加载中...</div>;
});

ReactDOM.render(
    <Provider store={antdMoiboleStore}>
        <ConnectedRouter history={history}>
            <Route path="/" render={(props: any) => <BaseLayout {...props}/>}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app"));
