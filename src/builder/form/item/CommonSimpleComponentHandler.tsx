import * as React from "react";
import {InputNumberProps} from "antd/lib/input-number";
import {SelectProps} from "antd/lib/select";


export interface AntdSelectProps extends SelectProps {
    renderOptions: () => React.ReactNode[];
}

/**
 * 通用的表单组件处理者，用于获取简单的表单组件
 */
export default class CommonSimpleComponentHandler {



}


function getDefaultKey(key) {

    return `antd_m_form_item_${key}`;
}
