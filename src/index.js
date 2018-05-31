import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import './config'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
//  boss genius me msg
ReactDom.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={GeniusInfo}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/Register" component={Register}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root')
)
