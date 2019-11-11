import React, { Component, Fragment, useEffect, useCallback } from 'react';
import { connect } from 'react-redux'
import 'normalize.css/normalize.css'
import URI from 'urijs'
import useNav from '../common/useNav'
import dayjs from 'dayjs'
import Detail from '../common/Detail'
import Candidate from './Candidate'
import Schedule from './Schedule'
import './App.css'

import Header from '../common/Header'
import Nav from '../common/Nav'

import {
    setDepartDate,
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setSearchParsed,
    nextDate,
    prevDate,
    setDepartTimeStr,
    setArriveTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets,
} from './actions'
import { h0 } from '../common/fp';


function App(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,
        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,
        dispatch
    } = props

    useEffect(() => {
        const parseObj = URI.parseQuery(window.location.search)
        const {
            aStation,
            dStation,
            trainNumber,
            date
        } = parseObj

        dispatch(setArriveStation(aStation))
        dispatch(setDepartStation(dStation))
        dispatch(setTrainNumber(trainNumber))
        dispatch(setDepartDate(h0(dayjs(date).valueOf())))
        
        dispatch(setSearchParsed(true))
    }, [])
    //parseQuery

    const {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next
    } = useNav(departDate,dispatch,prevDate,nextDate)

    const handleOnBack = useCallback(() => {
        window.history.back()
    }, [])
    
    /**
     * /rest/ticket
     */

    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);

    useEffect(() => {
        if (!searchParsed) {
            return;
        }
        const url = new URI('/rest/ticket')
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .toString()
        
        fetch(url)
            .then(res => res.json())
            .then(result => {
                const { detail, candidates } = result;
                const {
                    departTimeStr,
                    arriveTimeStr,
                    arriveDate,
                    durationStr,
                } = detail;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setTickets(candidates));
            })
    },[searchParsed,departDate,trainNumber])
    


    if (!searchParsed) {
        return null;
    }
    return (
        <Fragment>
            <div className='app'>
                <div className='header-wrapper'>
                    <Header
                        title={trainNumber}
                        onBack={handleOnBack}
                    />
                </div>
                <div className='nav-wrapper'>
                    <Nav
                        date = {departDate}
                        prev = {prev}
                        next = {next}
                        isPrevDisabled = {isPrevDisabled}
                        isNextDisabled = {isNextDisabled}
                    />
                </div>

                <Detail
                    departDate = {departDate}
                    arriveDate = {arriveDate}
                    durationStr = {durationStr}
                    departTimeStr = {departTimeStr}
                    arriveTimeStr = {arriveTimeStr}
                    departStation = {departStation}
                    arriveStation={arriveStation}
                    trainNumber = {trainNumber}
                />
                <Candidate></Candidate>
                <Schedule></Schedule>

            </div>
            
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return state
}
const mapDispathToProps = (dispatch) =>{
    return { dispatch }//能够直接获取dispatch函数
}
export default connect(mapStateToProps, mapDispathToProps)(App)

