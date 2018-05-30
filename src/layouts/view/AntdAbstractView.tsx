import AbstractSimpleView, {
    ViewProps,
    ViewState,
    ViewRenderHelper
} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {NavBar, Icon} from "antd-mobile";
import {NavBarProps} from "antd-mobile/lib/nav-bar/PropsType";
import * as React from "react";


export interface AntdAbstractViewProps extends ViewProps {

}

export interface AntdAbstractViewState extends ViewState {

}

export class AntdViewRenderHelper implements ViewRenderHelper {


    renderHeader = (title: string, p: NavBarProps): React.ReactNode => {

        const props: NavBarProps = {
            ...p,
            icon: window.history.length > 1 ? <Icon type="left" size={"md"}/> : null,
            onLeftClick: () => window.history.back(),
            mode: p.mode || "dark"
        };

        return <NavBar {...props as any}>{title}</NavBar>;
    };


}


export default abstract class AntdAbstractView<P extends AntdAbstractViewProps, S extends AntdAbstractViewState>
    extends AbstractSimpleView<P, S> {

    protected viewTitle: string;

    constructor(props: P, context: any) {
        super(props, context);
        this.renderHelper = new AntdViewRenderHelper();
    }

    renderHeader = () => {
        return this.renderHelper.renderHeader(this.viewTitle)
    }
}
