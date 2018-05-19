import * as  React from "react";
import AbstractSimpleView from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {UIBuilder} from "wuxp_react_dynamic_router/src/ui/UIBuilder";

let buildView = (uibuiler: UIBuilder, isAdd: boolean = true) => {
    if (isAdd) {
        uibuiler.appendMaskComponent(
            <div>我是弹出层</div>
        )
    } else {
        uibuiler.removeMaskComponent();
    }
};

/**
 *
 * TODO 试验品
 *
 */
export default class HomeView extends AbstractSimpleView<any, any> {


    componentDidMount(): void {

        setTimeout(() => {
            buildView(this);
        }, 1000);
        setTimeout(() => {
            buildView(this, false);
        }, 2000)
    }


    renderBody = () => {

        return <div key={'body'}>124</div>
    };

    renderFooter = () => {
        return <footer key={'footer'}>123</footer>
    };

    renderHeader = () => {
        return <header key={'header'}>头部</header>
    }


}
