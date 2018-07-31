import React from 'react'
import TrackList from '../track-list/track-list'
import Spotify from '../../util/spotify'
import './playlist.css'

class Playlist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'New Playlist'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleFocus (e) {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  handleChange (e) {
    this.setState({ name: e.target.value })
  }

  handleClick (e) {
    Spotify.populatePlaylist(this.state.name, this.props.tracks)
  }

  render () {
    return (
      <div className='Playlist'>
        <input value={this.state.name} onChange={this.handleChange} onFocus={this.handleFocus} />
        <TrackList moveTrack={this.props.moveTrack} tracks={this.props.tracks} />
        <a className='Playlist-save' onClick={this.handleClick}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist
