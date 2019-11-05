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
        departDate: h0(Date.now()),
        highSpeed: false,
        trainList: [],
        orderType: ORDER_DEPART,
        onlyTickets: false,
        /**
         * 过滤器其中的属性，需要准备一个数组存储具有哪些选项，再准备一个对象，存储选中的值
         */
        ticketTypes: [],
        checkedTicketTypes: {},
        trainTypes: [],
        checkedTrainTypes: {},
        departStations: [],
        checkedDepartStations: {},
        arriveStations: [],
        checkedArriveStations: {},
        departTimeStart: 0,
        departTimeEnd: 24,
        arriveTimeStart: 0,
        arriveTimeEnd: 24,
        isFiltersVisible: false,
        //程序已启动必须检查路径中带有的参数
        searchParsed:false 
    },
    composeEnhancers(
    applyMiddleware(thunk)
));

export default store;