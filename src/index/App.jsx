import React, { Component, Fragment, useCallback, useMemo } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators } from 'redux'
import 'normalize.css/normalize.css'
import './App.css'


import Header from '../common/Header'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    setCityData,
    setSelectedCity,
    showDateSelector,
    hideDateSelector,
    setDepartDate
} from './actions';
import { h0 } from '../common/fp';

function App(props) {
    console.log('..App', props)
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch,
        departDate,
        isDateSelectorVisible
    } = props

    

    const onBack = useCallback(() => {
        window.history.back()
    }, [])

    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector
        },dispatch)
    }, [])

    const citySelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect:setSelectedCity
        },dispatch)
    }, [])

    
    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                onClick: showDateSelector,
            },
            dispatch
        );
    }, []);
    
    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators({
            onBack: hideDateSelector,
        },dispatch)
    }, [])
    
    const onSelectDate = useCallback(day => {
        if (!day) {
            return;
        }
        if (day < h0()) {
            return;
        }
        dispatch(setDepartDate(day))
        dispatch(hideDateSelector())
    })
        return (
                <Fragment>
                <Header title={'火车票'} onBack={onBack}></Header>
                <form className="form">
                    <Journey from={from} to={to} {...cbs}></Journey>
                </form>
                <CitySelector
                    show={isCitySelectorVisible}
                    cityData={cityData}
                    isLoadingCityData={isLoadingCityData}
                    {...citySelectorCbs}
                >
                    
                </CitySelector>
                <DateSelector
                    show={isDateSelectorVisible}
                    {...dateSelectorCbs}
                    onSelect = {onSelectDate}
                >

                </DateSelector>
                <DepartDate
                    time={departDate}
                    {...departDateCbs}>
                </DepartDate>
                    <HighSpeed></HighSpeed>
                    <Submit></Submit>
                </Fragment>
        );
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispathToProps = (dispatch) =>{
    return {
        dispatch
    };
}
export default connect(mapStateToProps, mapDispathToProps)(App)

