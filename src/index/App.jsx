import React, { Component, Fragment, useCallback, useMemo } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators } from 'redux'
import 'normalize.css/normalize.css'
import './App.css'


import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

import {
    exchangeFromTo,
    showCitySelector
} from './actions';

function App(props) {
    console.log('..App', props)
    const {
        from,
        to,
        dispatch
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
    
    // const onShowCitySelector = () => {
    //     dispatch(showCitySelector(true))
    // }
        return (
                <Fragment>
                    <Header title={'火车票'} onBack={onBack}></Header>
                <Journey from={from} to={to} {...cbs}></Journey>
                    <DepartDate></DepartDate>
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

