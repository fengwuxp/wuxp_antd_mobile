import * as  React from "react";
import AbstractSimpleView from "wuxp_react_dynamic_router/src/layout/view/AbstractSimpleView";
import {Button} from "antd-mobile";
import {Flex, Modal, Toast, WingBlank, WhiteSpace} from "antd-mobile";
import {Link} from "react-router-dom";

const prompt = Modal.prompt;

/**
 *
 * TODO 试验品
 *
 */
export default class HomeView extends AbstractSimpleView<any, any> {


    componentDidMount(): void {

    }


    renderBody = () => {

        return <div key={'body'}></div>
    };

    renderFooter = () => {
        return <footer key={'footer'}>
            <WhiteSpace/>
            <WhiteSpace/>
            <WhiteSpace/>
            <Button type={"primary"} onClick={() => {
                this.showAddCourseDialog()
            }
            }>弹出对话宽</Button>
            <WhiteSpace/>
            <WhiteSpace/>
            <WhiteSpace/>

            <Button>
                <Link to="/tabs_demo">tabs demo</Link>
            </Button>


        </footer>
    };

    renderHeader = () => {
        return <header key={'header'}></header>
    };

    private showAddCourseDialog = () => {
        const r = prompt('加入班级',
            '请输入班级邀请码或课堂暗号',
            [
                {
                    text: '取消',
                    onPress: () => {
                    }
                },
                {
                    text: '确认加入',
                    onPress: (inviteCode) => new Promise((resolve, reject) => {

                        resolve();
                    })
                }
            ] as any,
            'default',
            null,
            ['不区分大小写']
        );
    };


}
