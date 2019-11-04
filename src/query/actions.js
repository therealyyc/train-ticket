import { ORDER_DEPART, ORDER_DURATION } from "./constant"

export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_SET_TRAIN_LIST = 'SET_TRAIN_LIST';
export const ACTION_SET_TICKETTYPES = 'SET_TICKETTYPES'
export const ACTION_SET_CHECKEDTICKETTYPES = 'SET_CHECKEDTICKETTYPES'
export const ACTION_SET_TRAINTYPES = 'SET_TRAINTYPES'
export const ACTION_SET_CHECKEDTRAINTYPES = 'SET_CHECKEDTRAINTYPES'
export const ACTION_SET_DEPARTSTATIONS = 'SET_DEPARTSTATIONS'
export const ACTION_SET_CHECKEDDEPARTSTATIONS = 'SET_CHECKEDDEPARTSTATIONS'
export const ACTION_SET_ARRIVEDSTATIONS = 'SET_ARRIVEDSTATIONS'
export const ACTION_SET_CHECKEDARRIVEDSTATIONS = 'SET_CHECKEDARRIVEDSTATIONS'
export const ACTION_SET_DEPARTTIMESTART = 'SET_DEPARTTIMESTART'
export const ACTION_SET_DEPARTTIMEEND = 'SET_DEPARTTIMEEND'
export const ACTION_SET_ARRIVETIMESTART = 'SET_ARRIVETIMESTART'
export const ACTION_SET_ARRIVETIMEEND = 'SET_ARRIVETIMEEND'
export const ACTION_SET_ISFILTERVISIBLE = 'SET_ISFILTERVISIBLE'
export const ACTION_SET_SEARCHPARSE = 'SET_SEARCHPARSE'
export const ACTION_SET_ORDERTYPE = 'SET_ORDERTYPE'
export const ACTION_SET_ONLYTICKETS = 'SET_ONLYTICKETS'

export function setFrom(from) {
    return {
        type: ACTION_SET_FROM,
        payload: from,
    };
}
export function setTo(to) {
    return {
        type: ACTION_SET_TO,
        payload: to,
    };
}
export function setDepartDate(departDate) {
    return {
        type: ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setHighSpeed(highSpeed) {
    return {
        type: ACTION_SET_HIGH_SPEED,
        payload: highSpeed,
    };
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();

        dispatch(setHighSpeed(!highSpeed));
    };
}

export function setTrainList(trainList) {
    return {
        type: ACTION_SET_TRAIN_LIST,
        payload: trainList,
    };
}

export function orderType(orderType) {
    return (dispatch,getState) => {
        const { orderType } = getState()
        if (orderType === ORDER_DEPART) {
            dispatch({
                type: ACTION_SET_ORDERTYPE,
                payload:ORDER_DURATION
            })
        } else {
            dispatch({
                type: ACTION_SET_ORDERTYPE,
                payload:ORDER_DEPART
            })
        }
    }
    // return{
    //     type: ACTION_SET_ORDERTYPE,
    //     payload:orderType
    // }
}

export function toggleOnlyTickets(onlyTickets) {
    return (dispatch,getState) => {
        const { onlyTickets } = getState()
        dispatch({
            type: ACTION_SET_ONLYTICKETS,
            payload:!onlyTickets
        })
    }
    // return{
    //     type: ACTION_SET_ONLYTICKETS,
    //     payload:onlyTickets
    // }
}

export function setTicketTypes(ticketTypes){
    return{
        type: ACTION_SET_TICKETTYPES,
        payload:ticketTypes
    }
}
export function setCheckedTicketTypes(checkedTicketTypes){
    return{
        type:ACTION_SET_CHECKEDTICKETTYPES,
        payload:checkedTicketTypes
    }
}
export function setTrainTypes(trainTypes){
    return{
        type:ACTION_SET_TRAINTYPES,
        payload:trainTypes
    }
}
export function setCheckedTrainTypes(checkedTrainTypes){
    return{
        type:ACTION_SET_CHECKEDTRAINTYPES,
        payload:checkedTrainTypes
    }
}
export function setDepartStations(departStations){
    return{
        type:ACTION_SET_DEPARTSTATIONS,
        payload:departStations
    }
}
export function setCheckedDepartStations(checkedDepartStations){
    return{
        type:ACTION_SET_CHECKEDDEPARTSTATIONS,
        payload:checkedDepartStations
    }
}
export function setArrivedStations(arrivedStations){
    return{
        type:ACTION_SET_ARRIVEDSTATIONS,
        payload:arrivedStations
    }
}
export function setCheckedArrivedStations(checkedArrivedStations){
    return{
        type:ACTION_SET_CHECKEDARRIVEDSTATIONS,
        payload:checkedArrivedStations
    }
}
export function setDepartTimeStart(departTimeStart){
    return{
        type:ACTION_SET_DEPARTTIMESTART,
        payload:departTimeStart
    }
}
export function setDepartTimeEnd(departTimeEnd){
    return{
        type:ACTION_SET_DEPARTTIMEEND,
        payload:departTimeEnd
    }
}
export function setArriveTimeStart(arriveTimeStart){
    return{
        type:ACTION_SET_ARRIVETIMESTART,
        payload:arriveTimeStart
    }
}
export function setArriveTimeEnd(arriveTimeEnd){
    return{
        type:ACTION_SET_ARRIVETIMEEND,
        payload:arriveTimeEnd
    }
}
export function toggleFilterVisible() {
    return (dispatch, getState) => {
        const { isFilterVisible } = getState()
        dispatch({
            type: ACTION_SET_ISFILTERVISIBLE,
            payload:!isFilterVisible
        })
    }
}

export function setSearchParse(searchParse){
    return{
        type:ACTION_SET_SEARCHPARSE,
        payload:searchParse
    }
}


