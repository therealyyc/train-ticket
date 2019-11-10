import React, { Component, Fragment, useCallback, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux'
import { Provider } from 'react-redux';
import { connect } from 'react-redux'

import 'normalize.css/normalize.css'
import './App.css'
import store from './store'

import URI from 'urijs'
import dayjs from 'dayjs';

import { h0 } from '../common/fp';
import Header from '../common/Header.jsx'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    prevDate,
    nextDate,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,

    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
} from './actions'

function App(props) {

    const {
        trainList,
        dispatch,
        from,
        to,
        searchParsed,
        orderType,
        onlyTickets,
        departDate,
        highSpeed,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        isFiltersVisible,
        arriveTimeStart,
        arriveTimeEnd
    } = props
    const onBack = useCallback(() => {
       window.history.back() 
    }, [])

    useEffect(() => {
        const quires = URI.parseQuery(window.location.search)
        const {
            from,
            to,
            date,
            highSpeed
        } = quires

        dispatch(setFrom(from))
        dispatch(setTo(to))
        dispatch(setDepartDate(date))
        dispatch(setHighSpeed(highSpeed))

        //查看是否解析完成
        dispatch(setSearchParsed(true))
    }, [])
    
    useEffect(() => {
        if (!searchParsed) {
            return;
        }
        const url = new URI('/rest/query')
        .setSearch('from', from)
        .setSearch('to', to)
        .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
        .setSearch('highSpeed', highSpeed)
        .setSearch('orderType', orderType)
        .setSearch('onlyTickets', onlyTickets)
        .setSearch(
            'checkedTicketTypes',
            Object.keys(checkedTicketTypes).join()
        )
        .setSearch(
            'checkedTrainTypes',
            Object.keys(checkedTrainTypes).join()
        )
        .setSearch(
            'checkedDepartStations',
            Object.keys(checkedDepartStations).join()
        )
        .setSearch(
            'checkedArriveStations',
            Object.keys(checkedArriveStations).join()
        )
        .setSearch('departTimeStart', departTimeStart)
        .setSearch('departTimeEnd', departTimeEnd)
        .setSearch('arriveTimeStart', arriveTimeStart)
        .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString();
        fetch(url)
            .then(response => response.json())
            .then(result => {
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            },
                        },
                    },
                } = result;

                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            });
    
        
    }, [
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd
    ])

    //使用参数获取异步请求来加载车次列表
    const isPrevDisabled = h0(departDate) <= h0()
    const isNextDisabled = h0(departDate) - h0() >= 20 * 86400 * 1000

    const prev = useCallback(() => {
        if (isPrevDisabled) {
            return;
        }
        dispatch(prevDate())
    }, [isPrevDisabled])
    
    const next = useCallback(() => {
        if (isNextDisabled) {
            return;
        }
        dispatch(nextDate())
    }, [isNextDisabled])
    
    const bottomCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggleOrderType,
                toggleHighSpeed,
                toggleOnlyTickets,
                toggleIsFiltersVisible,
                
                setCheckedTicketTypes,
                setCheckedTrainTypes,
                setCheckedDepartStations,
                setCheckedArriveStations,
                setDepartTimeStart,
                setDepartTimeEnd,
                setArriveTimeStart,
                setArriveTimeEnd
            },
            dispatch
        )
    },[])
    
    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} - ${to}`} onBack={onBack}></Header>
            </div>
            <Nav
                date={departDate}
                prev={prev}
                next={next}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
            />
            <List list={trainList} />
            <Bottom
                orderType ={orderType}
                onlyTickets ={onlyTickets}
                highSpeed={highSpeed}
                isFiltersVisible={isFiltersVisible}
                ticketTypes = {ticketTypes}
                trainTypes = {trainTypes}
                departStations = {departStations}
                arriveStations = {arriveStations}

                checkedTicketTypes = {checkedTicketTypes}
                checkedTrainTypes = {checkedTrainTypes}
                checkedDepartStations = {checkedDepartStations}
                checkedArriveStations = {checkedArriveStations}
                departTimeStart = {departTimeStart}
                departTimeEnd = {departTimeEnd}
                arriveTimeStart = {arriveTimeStart}
                arriveTimeEnd = {arriveTimeEnd}
                {...bottomCbs}
            />
        </div>
    )
}


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
