import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import NavlinkBar from './../navlink/navlink'


function Boss() {
  return (
    <h2>boss页面</h2>
  )
}
function Genius() {
  return (
    <h2>genius页面</h2>
  )
}
function Msg() {
  return (
    <h2>消息页面</h2>
  )
}
function User() {
  return (
    <h2>用户页面</h2>
  )
}

@connect(
  state=>state
)
class Dashboard extends React.Component {
  
  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fix-header" mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v=>(
              <Route 
                key={v.path}
                path={v.path}
                component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavlinkBar data={navList}></NavlinkBar>
      </div>
    )
  }
}

export default Dashboard