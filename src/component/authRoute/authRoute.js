import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{
  componentDidMount() {
    //  如果当前是注册或者登陆页面，直接return
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    //  获取用户信息
    axios.get('/user/info')
        .then(res => {
                if (res.status === 200) {
                  if (res.data.code === 0) {
                    //  有登录信息的
                  } else {
                    this.props.history.push('/login')
                  }
                }
              })
    //  是否登录
    //  现在的url地址 login是不需要跳转的

    //  用户的type 身份是牛人还是boss
    //  用户是否完善信息（选择头像 个人简介）
  }
  render() {
    return null
  }
}

export default AuthRoute