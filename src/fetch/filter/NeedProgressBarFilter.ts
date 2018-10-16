import {FetchOption} from "typescript_api_sdk/src/api/option/FetchOption";
import {ApiResp} from "typescript_api_sdk/src/api/model/ApiResp";
import ApiAbstractFilter from "typescript_api_sdk/src/api/filter/ApiAbstractFilter";
import {Toast} from "antd-mobile";


/**
 * 进度条计数器，用于在同时发起多个请求时，统一控制加载进度条
 * @type {number}
 */
let PROGRESSBAR_COUNT: number = 0;

/**
 * 需要使用请求进度条
 */
export class NeedProgressBarFilter extends ApiAbstractFilter<FetchOption, ApiResp<any>> {

    //加载文字提示
    public static LOADING_TEXT: string = "";

    public static LAZY_TIMES: number = 200;

    private timerId = null;

    preHandle(options: FetchOption): boolean | Promise<boolean> {
        if (options.useProgressBar) {
            if (PROGRESSBAR_COUNT === 0) {
                //防止重复出现
                //Toast.hide();
                //显示加载进度条，增加300毫秒的延迟
                this.timerId = setTimeout(() => {
                    Toast.loading(NeedProgressBarFilter.LOADING_TEXT, 20);
                }, NeedProgressBarFilter.LAZY_TIMES);
            }
            //计数器加一
            PROGRESSBAR_COUNT++;
        }
        return true;
    }


    postHandle(data: ApiResp<any>, options: FetchOption): boolean {
        if (options.useProgressBar) {
            //计数器减一
            PROGRESSBAR_COUNT--;
            if (PROGRESSBAR_COUNT === 0) {
                clearTimeout(this.timerId);
                //隐藏加载进度条
                Toast.hide();
            }
        }
        return true;
    }
}
