import * as React from "react";
import {Route, RouteProps} from "react-router";


export interface AuthorizedRouteProps extends RouteProps {

    redirectPath: string;
}

// export default class AuthorizedRoute extends React.Component<any, any> {

export default class AuthorizedRoute extends Route<AuthorizedRouteProps> {


    constructor(props: AuthorizedRouteProps, context: any) {
        super(props, context);
    }

    componentWillMount() {

        //TODO 判断是否登录，未登录重定向到登录页面
    }
}
