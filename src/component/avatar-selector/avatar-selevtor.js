import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }
  
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippo,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v => ({
                          icon: require(`./../img/${v}.png`),
                          text: v
                        }))
    const gridHeader = this.state.icon
                        ? (
                          <div>
                            <span>已选择头像</span>
                            <img src={this.state.icon} style={{width: 12}} alt={this.state.text} />
                          </div>
                        )
                        : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid 
            data={avatarList} 
            columnNum={5}
            onClick={v=>{
              this.setState(v)
              this.props.selectAvatar(v.text)
            }} />
        </List>
      </div>
    );
  }
}

export default AvatarSelector