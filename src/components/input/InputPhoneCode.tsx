import * as React from "react";
import {InputItem, Button} from 'antd-mobile';
import {isFunction} from "util";
import {InputItemProps} from "antd-mobile/lib/input-item";

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

    total: number;

    maxTotal?: number;
}

/**
 * 获取手机验证码的input　控件
 */
export default class InputPhoneCode extends React.Component<InputPhoneCodeProps, InputPhoneCodeState> {

    private timerId;

    private static DEFAULT_TIMES = 60;

    constructor(props: InputPhoneCodeProps, context: any) {
        super(props, context);

        const {defaultButtonText, times, renderButtonText} = this.props;

        const total = times || InputPhoneCode.DEFAULT_TIMES;
        this.state = {
            disabledButton: false,
            total,
            maxTotal: total,
            buttonText: defaultButtonText || "获取短信验证码",
        };

        if (isFunction(renderButtonText)) {
            this.renderButtonText = renderButtonText;
        }
    }

    render() {

        const {defaultButtonText, placeholder, value, onChange, maxLength} = this.props;
        const {disabledButton, buttonText} = this.state;
        // space-between
        return <div
            className="am-list-item"
            style={
                {
                    backgroundColor: "#ffffff",
                    paddingRight: 15,
                    justifyContent: "space-between",
                    paddingLeft: 0
                }

            }>
            <InputItem type="number"
                       clear
                       style={{width: 170}}
                       onChange={onChange}
                       value={value}
                       placeholder={placeholder || "短信验证码"}
                       maxLength={maxLength || 6}/>
            <Button type={"primary"}
                    inline
                    onClick={this.clickButton}
                    disabled={disabledButton}
                    size={"small"}>{buttonText}</Button>
        </div>;
    }

    componentWillUnmount(): void {
        clearTimeout(this.timerId);
    }

    protected clickButton = () => {

        this.props.onClickButton().then(() => {
            //开始倒计时
            this.countDown();
        });
    };


    private countDown = () => {
        const {restButtonText, times} = this.props;
        let {total, maxTotal} = this.state;

        this.timerId = setTimeout(() => {
            total--;
            if (total === 0) {
                this.setState({
                    buttonText: restButtonText || "重新获取",
                    disabledButton: false,
                    total: maxTotal
                });
            } else if (total < maxTotal) {
                const buttonText = this.renderButtonText(total);
                const state: InputPhoneCodeState = {
                    buttonText,
                    total,
                    disabledButton: true
                };
                this.setState(state);
                this.countDown();
            }

        }, 1000);
    };

    private renderButtonText = (total: number) => {

        return `${total}秒后重新获取`;
    }
}
