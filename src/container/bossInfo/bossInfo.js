import React from "react"
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import AvatarSelector from './../../component/avatar-selector/avatar-selevtor'
import { update } from './../../redux/user.redux'

@connect(
  state=>state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
 
    this.state = {
      title: '',
      company: '',
      money: ''
    }
  }

  handleInput(key, val) {
    this.setState({
      [key]: val
    })
  }
  
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector 
          selectAvatar={(imgname)=>{
            this.setState({
              avatar: imgname
            })
          }}></AvatarSelector>
        <InputItem onChange={v=>this.handleInput('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v=>this.handleInput('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v=>this.handleInput('money', v)}>
          薪资范围
        </InputItem>
        <TextareaItem onChange={v=>this.handleInput('desc', v)}
          rows={3}
          autoHeight
          title="职位要求">
        </TextareaItem>
        <WhiteSpace/>
        <Button type="primary"
          onClick={()=>{
            this.props.update(this.state)
          }}>保存</Button>
      </div>
    );
  }
}

export default BossInfo