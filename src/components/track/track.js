import React from 'react'
import './track.css'

class Track extends React.Component {
  render () {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.info.title}</h3>
          <p>{this.props.info.artist} | {this.props.info.album}</p>
        </div>
        <a className='Track-action'>+</a>
      </div>
    )
  }
}

export default Track
