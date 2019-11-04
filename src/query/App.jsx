import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import 'normalize.css/normalize.css'
import './App.css'
import store from './store'


import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'

function App(props) {
    return (
        <div>

        </div>
    )
}


const mapStateToProps = () => {
    
}

const mapDispatchToProps = (dispatch) => {
    return null
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
