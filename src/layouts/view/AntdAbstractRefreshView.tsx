import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import * as React from "react";
import AntdAbstractView, {AntdAbstractViewState} from "./AntdAbstractView";
import {AntdRefreshView} from "../decorators/AntdRefreshView";
import {RefreshView} from "wuxp_react_dynamic_router/src/layout/view/RefreshView";


export interface AntdRefreshState {
    refreshing: boolean;
}

export interface AntdAbstractRefreshViewProps extends ViewProps {

}

export interface AntdAbstractRefreshViewState extends AntdAbstractViewState, AntdRefreshState {


}


/**
 * 带下来刷新的普通视图
 */
@AntdRefreshView()
export default abstract class AntdAbstractRefreshView<P extends AntdAbstractRefreshViewProps, S extends AntdAbstractRefreshViewState>
    extends AntdAbstractView<P, S> implements RefreshView {

    protected pullToRefresh;

    constructor(props: P, context: any) {
        super(props, context);
    }

    onRefreshEventHandle: () => void;

    abstract onRefresh: () => void;
}
