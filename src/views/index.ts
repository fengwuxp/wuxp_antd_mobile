import {RouteConfig} from "react-router-config";
import asyncComponent from "wuxp_react_dynamic_router/src/components/load/AsyncComponent";


const routers: Array<RouteConfig> = [
    {
        path: '/',
        component: asyncComponent(() => import(/* webpackChunkName: "home" */ './HomeView'))
    }
];


export default routers;
