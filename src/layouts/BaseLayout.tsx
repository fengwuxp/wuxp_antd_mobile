import * as React from "react";
import DocumentTitle from 'react-document-title';
import {renderRoutes} from "react-router-config";
import {ReduxRouterProps} from "wuxp_react_dynamic_router/src/model/redux/ReduxRouterProps";
import routes from "../views";
import {isNullOrUndefined} from "util";


interface BaseLayoutProps extends ReduxRouterProps {

}

export default class BaseLayout extends React.Component<BaseLayoutProps, any> {


    render() {

        const pathname = this.props.location.pathname;

        return <DocumentTitle title={this.getPageTitle(pathname)}>
            {renderRoutes(routes)}
        </DocumentTitle>
    }


    /**
     * 根据路由获取视图名称
     * @param {string} pathname
     * @return {string}
     */
    getPageTitle = (pathname: string): string => {

        // console.log("--------pathname-------", pathname);
        const route = routes.find((item) => item.path === pathname);
        // console.log("--------route-------", route);
        return isNullOrUndefined(route) ? "" : isNullOrUndefined(route.name) ? '' : route.name;
    }
}
