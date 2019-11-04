import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { h0 } from '../common/fp';
import {
    ORDER_DEPART
} from './constant'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers),
    {
        from: null,
        to: null,
        date: h0(new Date()),
        highSpeed: false,
        trainList: [],
        orderType: ORDER_DEPART,//这是一个枚举值
        onlyTickets: false,
        /**
         * 过滤器其中的属性，需要准备一个数组存储具有哪些选项，再准备一个对象，存储选中的值
         */
        ticketTypes:[],
        checkedTicketTypes: {},
        trainTypes: [],
        checkedTrainTypes: {},
        departStations: [],
        checkedDepartStations: {},
        arrivedStations: [],
        checkedArrivedStations: {},
        departTimeStart: 0,
        departTimeEnd: 24,
        arriveTimeStart: 0,
        arriveTimeEnd:24,
        isFilterVisible: false,
        searchParse:false //程序已启动必须检查路径中带有的参数
    },
    composeEnhancers(
    applyMiddleware(thunk)
));

export default store;