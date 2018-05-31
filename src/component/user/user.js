import React from "react"
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button } from "antd-mobile"

@connect(
  state => state.user
)
class User extends React.Component {

    render() {
      const props = this.props
      const Item = List.Item
      const Brief = Item.Brief
      return props.user ? (
        <div>
          <Result
            img={<img src={require(`./../img/${props.avatar}.png`)} style={{width:50}} alt="" />}
            title={props.user}
            message={props.type==='boss'?props.company:null}
            ></Result>
          <List renderHeader={()=>'简介'}>
            <Item
              multipleLine
            >
              {props.desc}
              {props.desc.split('\n').map((v, i) => (<Brief key={v + i}>{v}</Brief>))}
              {props.money?<Brief>{props.money}</Brief>:null}
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button type="warning">退出登录</Button>
        </div>
      ) : null;
    }
}

export default User