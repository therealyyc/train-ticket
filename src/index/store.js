import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers),
    {
        /**
         * 默认选项配置
         */
        from: '北京',
        to: '上海',
        isCitySelectorVisible: false,//城市选择浮层
        currentSelectingLeftCity: false,//标识选择完城市，将城市选择在哪里
        cityData: null,//城市的所有数据
        isLoadingCityData: false,//当前是否加载城市数据
        isDateSelectorVisible: false,//日期选择浮层的开关
        highSpeed: false//是否选择高铁动车
    },
    composeEnhancers(
    applyMiddleware(thunk)
));

export default store;