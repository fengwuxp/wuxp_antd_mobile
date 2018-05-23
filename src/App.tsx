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
            <Switch>
                <Route path="/login" component={UserLayout}/>
                <Route path="/logout" component={UserLayout}/>
                <AuthorizedRoute
                    path="/"
                    isLogin={false}
                    render={(props: any) => <BaseLayout {...props} />}
                    redirectPath="/login"
                />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app"));
