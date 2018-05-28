import {NamedRouteConfig} from "wuxp_react_dynamic_router/src/model/route/NamedRouteConfig";
import asyncComponent from "wuxp_react_dynamic_router/src/components/load/AsyncComponent";


const routers: Array<NamedRouteConfig> = [
    {
        path: '/',
        component: asyncComponent(() => import(/* webpackChunkName: "home" */ './HomeView'))
    }
];


export default routers;
