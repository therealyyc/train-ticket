import {
    ACTION_SET_FROM,
    ACTION_SET_TO,
    ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    ACTION_SET_CITY_DATA,
    ACTION_SET_IS_LOADING_CITY_DATA,
    ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    ACTION_SET_HIGH_SPEED,
    ACTION_SET_DEPART_DATE
} from './actions';

/**
 * 分解成多个reducer,每一个reducer都是一个函数
 */

export default {
    from(state = '北京',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_FROM:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    to(state = '上海',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_TO:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    isCitySelectorVisible(state = 'isCitySelectorVisible',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    currentSelectingLeftCity(state = 'currentSelectingLeftCity',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    cityData(state = 'cityData',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_CITY_DATA:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    isLoadingCityData(state = 'isLoadingCityData',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_IS_LOADING_CITY_DATA:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    isDateSelectorVisible(state = 'isDateSelectorVisible',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    highSpeed(state = 'highSpeed',action){
        const {type,payload} = action
        switch(type){
            case ACTION_SET_HIGH_SPEED:
                return payload
            default:
                //console.log(action)
        }
        return state;
    },
    departDate(state = Date.now(), action) {
        const { type, payload } = action;
        switch (type) {
            case ACTION_SET_DEPART_DATE:
                return payload;
            default:
        }
        return state
    }
 }

