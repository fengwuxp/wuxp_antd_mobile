import AbstractSimpleQueryView, {SimpleQueryViewState} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleQueryView";
import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {ApiQueryReq} from "typescript_api_sdk/src/api/model/ApiQueryReq";
import * as React from "react";
import {AntdRefreshView} from "../decorators/AntdRefreshView";
import {RefreshView} from "wuxp_react_dynamic_router/src/layout/view/RefreshView";
import {AntdRefreshState} from "./AntdAbstractRefreshView";

export interface AntdAbstractQueryViewProps extends ViewProps {

}

export interface AntdAbstractQueryViewState extends SimpleQueryViewState, AntdRefreshState {

}


/**
 * 带下拉刷新的查询视图
 */
@AntdRefreshView()
export default abstract class AntdAbstractQueryView<Q extends ApiQueryReq, E,
    P extends AntdAbstractQueryViewProps,
    S extends AntdAbstractQueryViewState> extends AbstractSimpleQueryView<Q, E, P, S>
    implements RefreshView {


    constructor(props: P, context: any, isPaging: boolean) {
        super(props, context, isPaging);
    }

    onRefreshEventHandle: () => void;

    abstract onRefresh: () => Promise<any>;

}
