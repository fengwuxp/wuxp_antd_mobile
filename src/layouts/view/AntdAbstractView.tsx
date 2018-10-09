import AbstractSimpleView, {
    ViewProps,
    ViewState
} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {NavBar, Icon} from "antd-mobile";
import {NavBarProps} from "antd-mobile/lib/nav-bar/PropsType";
import * as React from "react";


export interface AntdAbstractViewProps extends ViewProps {

}

export interface AntdAbstractViewState extends ViewState {

    navBarTitle?: string;
}

export class AntdViewRenderHelper {


    renderHeader = (title: string, p: NavBarProps): React.ReactNode => {

        const props: NavBarProps = {
            icon: window.history.length >= 2 ? <Icon type="left" size={"lg"}/> : null,
            onLeftClick: () => window.history.back(),
            mode: p.mode || "dark",
            ...p
        };

        return <NavBar {...props as any}><div>{title}</div></NavBar>;
    };


}


export default abstract class AntdAbstractView<P extends AntdAbstractViewProps, S extends AntdAbstractViewState>
    extends AbstractSimpleView<P, S> {

    protected renderHelper;

    constructor(props: P, context: any) {
        super(props, context);
        this.renderHelper = new AntdViewRenderHelper();
    }

    renderHeader = () => {
        return this.renderHelper.renderHeader(this.state.navBarTitle, {})
    }
}
