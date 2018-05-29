import * as React from "react";
import {Flex, InputItem, Button} from 'antd-mobile';
import TimerUtil from "wuxp_react_dynamic_router/src/utils/common/TimerUtil";
import {isFunction} from "util";
import {InputItemProps} from "antd-mobile/es/input-item";

export interface InputPhoneCodeProps extends InputItemProps {


    /**
     * 默认的按钮文字
     * 默认值：获取短信验证码
     */
    defaultButtonText?: string;


    /**
     * 重新获取的文字
     * 默认值：重新获取
     */
    restButtonText?: string;

    /**
     * 渲染按钮文本
     * @param second 剩余秒数
     * @return {string}
     */
    renderButtonText?: (second) => string;

    /**
     * 倒计时秒数
     * 默认：60
     */
    times?: number;

    /**
     * 点击按钮
     * @return {Promise<any>}
     */
    onClickButton: () => Promise<any>;


}

interface InputPhoneCodeState {

    disabledButton?: boolean;

    buttonText?: string;

    value?: string;
}

/**
 * 获取手机验证码的input　控件
 */
export default class InputPhoneCode extends React.Component<InputPhoneCodeProps, InputPhoneCodeState> {


    constructor(props: InputPhoneCodeProps, context: any) {
        super(props, context);

        const {defaultButtonText, renderButtonText, value} = this.props;


        this.state = {
            disabledButton: false,
            buttonText: defaultButtonText || "获取短信验证码",
            value
        };

        if (isFunction(renderButtonText)) {
            this.renderButtonText = renderButtonText;
        }
    }

    render() {

        const {defaultButtonText, placeholder, onChange, maxLength} = this.props;
        const {disabledButton, value, buttonText} = this.state;

        return <Flex style={
            {
                backgroundColor: "#ffffff",
                paddingRight: 15
            }
        } justify={"between"}>
            <InputItem type="number"
                       clear
                       onChange={onChange}
                       defaultValue={value}
                       placeholder={placeholder || "短信验证码"}
                       maxLength={maxLength || 6}/>
            <Button type={"primary"}
                    inline
                    onClick={this.clickButton}
                    disabled={disabledButton}
                    size={"small"}>{buttonText}</Button>
        </Flex>;
    }

    protected clickButton = () => {

        this.props.onClickButton().then(() => {
            //开始倒计时
            this.countDown();
        });
    };


    private countDown = () => {
        let {times, restButtonText} = this.props;

        let total = times || 60;

        TimerUtil.countDown({
            times: 1000,
            total: total,
            callback: (num) => {
                // console.log("--------total--------", num);
                let buttonText = this.renderButtonText(num);
                let state: InputPhoneCodeState = {
                    buttonText
                };
                if (num === total) {
                    state.disabledButton = true
                }
                this.setState(state);
            },
            endAction: () => {
                this.setState({
                    buttonText: restButtonText || "重新获取",
                    disabledButton: false
                });
            }
        })
    };

    private renderButtonText = (total: number) => {

        return `${total}秒后重新获取`;
    }
}
