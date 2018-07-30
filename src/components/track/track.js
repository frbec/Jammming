import React from 'react'
import './track.css'

class Track extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.moveTrack(this.props.info)
  }

  render () {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.info.name}</h3>
          <p>{this.props.info.artists.join(', ')} | {this.props.info.album}</p>
        </div>
        <a className='Track-action' onClick={this.handleClick}>{this.props.moveTrack.name === 'bound addTrack' ? '+' : '-'}</a>
      </div>
    )
  }
}

export default Track
