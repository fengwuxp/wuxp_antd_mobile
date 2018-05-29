import AbstractSimpleQueryView, {SimpleQueryViewState,} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleQueryView";
import {ViewProps} from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {ListView} from "antd-mobile";
import React from "react";
import {ApiQueryReq} from "typescript_api_sdk/src/api/model/ApiQueryReq";


export default abstract class AntdAbstractListView<Q extends ApiQueryReq,
    P extends ViewProps,
    S extends SimpleQueryViewState>
    extends AbstractSimpleQueryView<Q, P, S> {


    protected listDataLength: number = 1;

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
        this.serialQuery();
    };


    protected renderListViewFooter = () => {

        return <div style={{padding: 30, textAlign: 'center'}}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>
    };

    protected listViewIsEmpty = (): boolean => {

        return this.listDataLength === 0 && this.queryHelper.isEnd();
    };

    protected abstract renderEmptyView: () => React.ReactNode;

    protected abstract renderRowItem: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => React.ReactElement<any>;
}
