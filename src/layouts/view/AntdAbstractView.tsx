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

        const pathname = location.pathname;
        //第一次进入应用程序是的页面
        if (window['firstViewPathName'] == null) {
            window['firstViewPathName'] = pathname;
        }

        const isFirstView = pathname === window['firstViewPathName'];

        const props: NavBarProps = {
            icon: isFirstView ? null : <Icon type="left" size={"lg"}/>,
            onLeftClick: () => window.history.back(),
            mode: p.mode || "dark",
            ...p
        };

        return <NavBar {...props as any}>
            <div>{title}</div>
        </NavBar>;
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
