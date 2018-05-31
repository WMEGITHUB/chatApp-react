import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component {
  componentDidMount() {
    io('ws://localhost:9093')
  }
  render() {
    return (
      <div>
        chat at with user :{this.props.match.params.user}
      </div>
    )
  }
}

export default Chat