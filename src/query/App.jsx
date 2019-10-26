import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import 'normalize.css/normalize.css'
import './App.css'
import store from './store'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    aaaa
                </Fragment>
            </Provider>
        );
    }
}
const mapStateToProps = (state) => {
    
}
const mapDispathToProps = (dispatch) =>{
    
}
export default connect(mapStateToProps, mapDispathToProps)(App)

