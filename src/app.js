import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hasErr: false
    }
  }
  componentDidCatch(err, info) {
    this.setState({
      hasErr: true
    })
  }
  render() {
    return this.state.hasErr
      ? <h2>页面出错了！</h2>
      :(
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
      )
  }
}

export default App