import React, { Component } from 'react'
import SearchBar from './components/search-bar/search-bar'
import Results from './components/results/results'
import Playlist from './components/playlist/playlist'
import Spotify from './util/spotify'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      term: '',
      tracks: [],
      savedTracks: []
    }

    this.refreshResults = this.refreshResults.bind(this)
    this.searchSpotify = this.searchSpotify.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  searchSpotify (term) {
    Spotify.search(term)
      .then(results => {
        this.refreshResults(results)
      })
  }

  refreshResults (newTracks) {
    this.setState({ tracks: newTracks })
  }

  addTrack (track) {
    let newState = this.state.savedTracks
    newState.push(track)
    this.setState({ savedTracks: newState })
  }

  removeTrack (track) {
    let newState = this.state.savedTracks
    const index = newState.indexOf(track)
    if (index > -1) {
      newState.splice(index, 1)
    }
    this.setState({ savedTracks: newState })
  }

  render () {
    return (
      <div className='Main'>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className='App-playlist'>
            <Results moveTrack={this.addTrack} tracks={this.state.tracks} />
            <Playlist moveTrack={this.removeTrack} tracks={this.state.savedTracks} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
