import React from 'react'
import TrackList from '../track-list/track-list'
import './playlist.css'

class Playlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'New Playlist',
      savedTracks: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.addTrack = this.addTrack.bind(this)
  }

  handleChange (e) {
    this.setState({ name: e.target.value })
  }

  addTrack (track) {
    this.setState({ savedTracks: this.state.savedTracks.push(track) })
  }

  handleFocus (e) {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  render () {
    return (
      <div className='Playlist'>
        <input value={this.state.name} onChange={this.handleChange} onFocus={this.handleFocus} />
        <TrackList tracks={this.state.savedTracks} />
        <a className='Playlist-save'>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist
