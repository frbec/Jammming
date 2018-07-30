import React from 'react'
import Playlist from '../playlist/playlist'
import './track.css'

class Track extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    Playlist.addTrack(() => {
      return {
        title: this.props.info.name,
        artist: this.props.info.artist,
        album: this.props.info.album
      }
    })
    e.preventDefault()
  }

  render () {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.info.name}</h3>
          <p>{this.props.info.artists.join(', ')} | {this.props.info.album}</p>
        </div>
        <a className='Track-action' onClick={this.handleClick}>+</a>
      </div>
    )
  }
}

export default Track
