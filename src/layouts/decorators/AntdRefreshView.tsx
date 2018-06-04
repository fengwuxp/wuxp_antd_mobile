import * as React from "react";
import {PullToRefresh, Icon, Flex} from "antd-mobile";
import {Indicator} from 'rmc-pull-to-refresh/lib/PropsType';
import {RefreshView} from "wuxp_react_dynamic_router/src/layout/view/RefreshView";


export interface AntdRefreshViewOptions {

}


const TPullToRefresh = PullToRefresh as any;

/**
 * 带刷新的视图
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

        return class extends constructor implements RefreshView {

            protected pullToRefresh;

            /**
             * 最小刷新间隔时间 单位毫秒
             * @type {number}
             */
            protected minRefreshTime = 1500;


            onRefreshEventHandle = () => {
                const beginTime = new Date().getTime();
                const minRefreshTime = this.minRefreshTime;
                this.setState({refreshing: true});
                const promise = this.onRefresh();
                promise.finally(() => {
                    const endTime = new Date().getTime();

                    let number = endTime - beginTime;
                    if (number > minRefreshTime) {
                        this.setState({refreshing: false});
                    } else {
                        setTimeout(() => {
                            this.setState({refreshing: false});
                        }, minRefreshTime + 100 - number);

                    }
                });

            };

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

            getIndicator = (): Indicator => {
                return {
                    activate: "松开刷新",
                    deactivate: '上拉可以刷新',
                    release: <Flex justify={"center"} align={"center"}>
                        <Icon type="loading"/>
                        <span style={{marginLeft: 10}}>正在加载</span>
                    </Flex>,
                    finish: "刷新完成"
                }
            };


            getScrollContainer = (): React.ReactNode => null;

        }
    }
}
