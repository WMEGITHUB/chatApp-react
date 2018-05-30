import React from "react"
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from './../../component/avatar-selector/avatar-selevtor'

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
    return (
      <div>
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
        <Button type="primary">保存</Button>
      </div>
    );
  }
}

export default BossInfo