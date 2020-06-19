import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux";
import {CssBaseline, ThemeProvider} from '@material-ui/core'

import App from './app'
import theme from './app-theme'
import * as serviceWorker from './serviceWorker'
import {store} from "./store/store";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
