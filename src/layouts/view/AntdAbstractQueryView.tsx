import AbstractSimpleQueryView, {SimpleQueryViewState} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleQueryView";
import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {ApiQueryReq} from "typescript_api_sdk/src/api/model/ApiQueryReq";
import * as React from "react";
import {PullToRefresh} from "antd-mobile";
import {Indicator} from 'rmc-pull-to-refresh/lib/PropsType';

export interface AntdAbstractQueryViewProps extends ViewProps {

}

export interface AntdAbstractQueryViewState extends SimpleQueryViewState {

}


const TPullToRefresh = PullToRefresh as any;


/**
 * 带下来刷新的查询视图
 */
export default abstract class AntdAbstractQueryView<Q extends ApiQueryReq, E,
    P extends AntdAbstractQueryViewProps,
    S extends AntdAbstractQueryViewState> extends AbstractSimpleQueryView<Q, E, P, S> {

    protected pullToRefresh;

    constructor(props: P, context: any, isPaging: boolean) {
        super(props, context, isPaging);
    }


    protected renderWrapper = (children: React.ReactNode) => {
        return <TPullToRefresh direction={"down"}
                               distanceToRefresh={25}
                               damping={60}
                               style={{height: "100%", overflowY: 'scroll'}}
                               ref={el => this.pullToRefresh = el}
                               indicator={this.getIndicator}
                               refreshing={this.state.refreshing}
                               onRefresh={this.onRefresh}>{children}</TPullToRefresh>
    };

    getIndicator = ():Indicator=> {
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
