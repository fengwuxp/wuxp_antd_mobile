import * as React from "react";
import {PullToRefresh} from "antd-mobile";
import {RefreshView} from "wuxp_react_dynamic_router/src/layout/view/RefreshView";
import {AntdRefresh} from "./AntdRefresh";


export interface AntdRefreshViewOptions {

}


const TPullToRefresh = PullToRefresh as any;

/**
 * 带刷新的通用视图
 * @param {AntdRefreshViewOptions} options
 * @return {(constructor: any) => any}
 * @constructor
 */

export function AntdRefreshView<T extends RefreshView>(options?: AntdRefreshViewOptions) {
    /**
     * decorator
     * @param  {T} constructor
     */
    return (constructor: any): any => {

        @AntdRefresh()
        class RefreshView extends constructor {

            protected pullToRefresh;

            renderWrapper = (childrn: React.ReactNode) => {
                return <TPullToRefresh direction={"down"}
                                       distanceToRefresh={25}
                                       damping={100}
                                       style={{height: "100%", overflowY: 'scroll'}}
                                       ref={el => this.pullToRefresh = el}
                                       indicator={this.getIndicator()}
                                       refreshing={this.state.refreshing}
                                       onRefresh={this.onRefreshEventHandle}>{childrn}</TPullToRefresh>
            };
        }

        return RefreshView;
    }
}
