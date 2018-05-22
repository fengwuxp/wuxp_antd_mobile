import * as  React from "react";
import AbstractSimpleView from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {Button} from "antd-mobile";



/**
 *
 * TODO 试验品
 *
 */
export default class HomeView extends AbstractSimpleView<any, any> {


    componentDidMount(): void {



    }


    renderBody = () => {

        return <div key={'body'}>124</div>
    };

    renderFooter = () => {
        return <footer key={'footer'}>
            <Button type={"primary"}>123</Button>
        </footer>
    };

    renderHeader = () => {
        return <header key={'header'}>头部</header>
    }


}
