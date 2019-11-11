import {
    ACTION_SET_DEPART_DATE,
    ACTION_SET_ARRIVE_DATE,
    ACTION_SET_DEPART_TIME_STR,
    ACTION_SET_ARRIVE_TIME_STR,
    ACTION_SET_DEPART_STATION,
    ACTION_SET_ARRIVE_STATION,
    ACTION_SET_TRAIN_NUMBER,
    ACTION_SET_DURATION_STR,
    ACTION_SET_TICKETS,
    ACTION_SET_IS_SCHEDULE_VISIBLE,
    ACTION_SET_SEARCH_PARSED,
} from './actions'

export default {
    departDate(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_DEPART_DATE:
                return payload;//代表最新值
            default:
        }
        return state
    },
    arriveDate(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_ARRIVE_DATE:
                return payload;//代表最新值
            default:
        }
        return state
    },
    departTimeStr(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_DEPART_TIME_STR:
                return payload;//代表最新值
            default:
        }
        return state
    },
    arriveTimeStr(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_ARRIVE_TIME_STR:
                return payload;//代表最新值
            default:
        }
        return state
    },
    departStation(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_DEPART_STATION:
                return payload;//代表最新值
            default:
        }
        return state
    },
    arriveStation(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_ARRIVE_STATION:
                return payload;//代表最新值
            default:
        }
        return state
    },
    trainNumber(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_TRAIN_NUMBER:
                return payload;//代表最新值
            default:
        }
        return state
    },
    durationStr(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_DURATION_STR:
                return payload;//代表最新值
            default:
        }
        return state
    },
    tickets(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_TICKETS:
                return payload;//代表最新值
            default:
        }
        return state
    },
    isScheduleVisible(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_IS_SCHEDULE_VISIBLE:
                return payload;//代表最新值
            default:
        }
        return state
    },
    searchParsed(state='',action){
        const {type,payload} =action;
        switch(type){
            case ACTION_SET_SEARCH_PARSED:
                return payload;//代表最新值
            default:
        }
        return state
    },
}