import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import * as React from "react";
import {PullToRefresh} from "antd-mobile";
import {Indicator} from 'rmc-pull-to-refresh/lib/PropsType';
import AntdAbstractView, {AntdAbstractViewState} from "./AntdAbstractView";

export interface AntdAbstractRefreshViewProps extends ViewProps {

}

export interface AntdAbstractRefreshViewState extends AntdAbstractViewState {

    refreshing: boolean;
}

const TPullToRefresh = PullToRefresh as any;


export default abstract class AntdAbstractRefreshView<P extends AntdAbstractRefreshViewProps, S extends AntdAbstractRefreshViewState>
    extends AntdAbstractView<P, S> {

    protected pullToRefresh;

    constructor(props: P, context: any) {
        super(props, context);
    }


    protected renderWrapper = (childrn: React.ReactNode) => {
        return <TPullToRefresh direction={"down"}
                               distanceToRefresh={25}
                               damping={60}
                               style={{height: "100%", overflowY: 'scroll'}}
                               ref={el => this.pullToRefresh = el}
                               indicator={this.getIndicator}
                               refreshing={this.state.refreshing}
                               onRefresh={this.onRefresh}>{childrn}</TPullToRefresh>
    };

    getIndicator = (): Indicator => {
        return {
            activate: "松开刷新",
            deactivate: '上拉可以刷新',
            release: "--",
            finish: "刷新完成"
        }
    };

    getScrollContainer = (): React.ReactNode => null;

    abstract onRefresh: () => void;
}
