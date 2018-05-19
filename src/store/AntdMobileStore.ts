import {Store} from 'redux'
import {reduxStoreBuilderFactory} from "wuxp_react_dynamic_router/src/factory/store/StoreFactory";
import {createRootSaga} from "wuxp_react_dynamic_router/src/manager/saga/SagaManager";


export interface AntdMobileStore {

}


/**
 * 管理 store
 * @type {StoreBuilder<AntdMobileStore>}
 */
const builder = reduxStoreBuilderFactory<AntdMobileStore>({});


const antdMoiboleStore: Store<AntdMobileStore> = builder.build();

//运行root saga
builder.sagaMiddleware.run(createRootSaga());


export {
    antdMoiboleStore
}
