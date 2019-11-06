import React, { Component, Fragment, useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import Header from '../common/Header.jsx'
import 'normalize.css/normalize.css'
import './App.css'
import store from './store'

import URI from 'urijs'
import dayjs from 'dayjs';

import { h0 } from '../common/fp';
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
} from './actions'

function App(props) {

    const {
        dispatch,
        from,
        to,
        searchParsed,
        orderType,
        onlyTickets,
        departDate,
        highSpeed,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
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
    
    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} - ${to}`} onBack={onBack}></Header>
            </div>

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
