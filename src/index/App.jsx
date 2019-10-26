import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import 'normalize.css/normalize.css'
import './App.css'


import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

class App extends Component {
    render() {
        return (
                <Fragment>
                    <Header></Header>
                    <Journey></Journey>
                    <DepartDate></DepartDate>
                    <HighSpeed></HighSpeed>
                    <Submit></Submit>
                </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
}
const mapDispathToProps = (dispatch) =>{
    return {};
}
export default connect(mapStateToProps, mapDispathToProps)(App)

