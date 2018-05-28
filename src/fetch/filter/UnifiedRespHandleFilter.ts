import ApiAbstractFilter from "typescript_api_sdk/src/api/filter/ApiAbstractFilter"
import {ApiResp} from "typescript_api_sdk/src/api/model/ApiResp";
import {Toast} from "antd-mobile";
import {FetchOption} from "typescript_api_sdk/src/api/option/FetchOption";


let count = 0;

/**
 * 统一响应处理过滤器
 */
export class UnifiedRespHandleFilter extends ApiAbstractFilter<FetchOption, ApiResp<any>> {


    postHandle(resp: ApiResp<any>, context?: any): boolean {
        const {message, success, actions} = resp;

        if (success) {
            return true;
        }
        if (count > 0) {
            return false;
        }
        //请求失败
        count++;
        Toast.info(message ? message : "操作失败", 2, () => {
            count--;
        });
        return false;
    }
}
