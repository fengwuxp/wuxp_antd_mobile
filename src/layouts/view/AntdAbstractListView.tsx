import AbstractSimpleQueryView, {SimpleQueryViewState,} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleQueryView";
import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {ListView} from "antd-mobile";
import React from "react";
import {ApiQueryReq} from "typescript_api_sdk/src/api/model/ApiQueryReq";
import {AntdViewRenderHelper} from "./AntdAbstractView";


/**
 * 基于antd的 listView
 */
export default abstract class AntdAbstractListView<Q extends ApiQueryReq,
    E,
    P extends ViewProps,
    S extends SimpleQueryViewState>
    extends AbstractSimpleQueryView<Q, E, P, S> {


    constructor(props: P, context: any, isPaging?: boolean) {
        super(props, context, isPaging);
        this.renderHelper = new AntdViewRenderHelper();
    }

    /**
     * 初始长度 -1 表示还未进行查询
     * @type {number}
     */
    protected listDataLength: number = -1;

    /**
     * 默认的data sources实现
     * gen data source
     * @return {any}
     */
    genDataSource = () => {
        const dataSource = new ListView.DataSource({

            /**
             * 获取每一行的数据
             * @param dataBlob
             * @param sectionID
             * @param rowID
             * @return {any}
             */
            getRowData: (dataBlob, sectionID, rowID) => {
                let element = dataBlob[sectionID][rowID];
                console.log("-getRowData->", element, sectionID, rowID);
                return element;
            },

            /**
             * 行数据是否发生改变
             * @param row1
             * @param row2
             * @return {boolean}
             */
            rowHasChanged: (row1, row2) => {
                console.log("-------rowHasChanged-------", row1, row2);
                return row1 !== row2
            },

            // getSectionHeaderData: (dataBlob, sectionID) => {},


            // sectionHeaderHasChanged: (s1, s2) => {
            //     console.log("-------rowHasChanged-------", s1, s2);
            //     return s1 !== s2;
            // }
        });

        return dataSource
    };

    protected onEndReached = (event) => {
        if (this.isPaging) {
            return;
        }
        this.serialQuery();
    };


    protected renderListViewFooter = () => {

        return <div style={{padding: 30, textAlign: 'center'}}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>
    };

    /**
     * 更新列表数据长度
     * @param {number} length
     * @param {boolean} rest 是否重置
     */
    protected updateListDataLength = (length: number, rest: boolean = false) => {

        if (this.listDataLength === -1 || rest) {
            this.listDataLength = 0;
        }
        this.listDataLength += length;
    };

    /**
     * 列表数据是否为空
     * @return {boolean}
     */
    protected listViewIsEmpty = (): boolean => {

        return this.listDataLength === 0 && (this.queryHelper.isEnd() || this.queryHelper.req.queryPage > 1);
    };

    protected abstract renderEmptyView: () => React.ReactNode;

    protected abstract renderRowItem: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => React.ReactElement<any>;
}
