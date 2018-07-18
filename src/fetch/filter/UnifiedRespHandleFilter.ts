import ApiAbstractFilter from "typescript_api_sdk/src/api/filter/ApiAbstractFilter"
import {ApiResp} from "typescript_api_sdk/src/api/model/ApiResp";
import {Toast} from "antd-mobile";
import {FetchOption} from "typescript_api_sdk/src/api/option/FetchOption";


let count = 0;

/**
 * 统一响应处理过滤器
 */
export class UnifiedRespHandleFilter extends ApiAbstractFilter<FetchOption, ApiResp<any>> {


    postHandle(resp: ApiResp<any>, options?: FetchOption): boolean {
        const {message, success, actions} = resp;

        console.log("-------unified resp--->", success, count);
        if (success) {
            return true;
        }
        if (count > 0 || options.useProgressBar != true) {
            return false;
        }
        //请求失败
        count++;
        Toast.fail(message ? message : "操作失败", 2, () => {
            count--;
        });
        return false;
    }
}
