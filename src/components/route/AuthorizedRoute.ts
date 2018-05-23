import {Route, RouteProps} from "react-router";
import BrowserNavigatorFactory from "wuxp_react_dynamic_router/src/factory/navigator/web/BrowserNavigatorFactory"
const history = BrowserNavigatorFactory.get();

export interface AuthorizedRouteProps extends RouteProps {

    redirectPath: string;

    isLogin: boolean
}


export default class AuthorizedRoute extends Route<AuthorizedRouteProps> {


    constructor(props: AuthorizedRouteProps, context: any) {
        super(props, context);
    }

    componentWillMount() {

        console.log("--------this.props.isLogin-------------",this.props.isLogin,this.props.redirectPath)
        //判断是否登录，未登录重定向到登录页面
        if (!this.props.isLogin) {
            history.push(this.props.redirectPath);
        }

    }
}
