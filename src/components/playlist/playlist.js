import React from 'react'
import TrackList from '../track-list/track-list'
import './playlist.css'

class Playlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'New Playlist'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleFocus (e) {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  handleChange (e) {
    this.setState({ name: e.target.value })
  }

  render () {
    return (
      <div className='Playlist'>
        <input value={this.state.name} onChange={this.handleChange} onFocus={this.handleFocus} />
        <TrackList moveTrack={this.props.moveTrack} tracks={this.props.tracks} />
        <a className='Playlist-save'>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist
