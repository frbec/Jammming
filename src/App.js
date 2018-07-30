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
      tracks: [
        {
          name: 'Tiny Dancer',
          artists: ['Elton John'],
          album: 'Madman Across the Water'
        },
        {
          name: 'Tiny Dancer',
          artists: ['Tim McGraw'],
          album: 'Love Story'
        },
        {
          name: 'Tiny Dancer',
          artists: ['Rockabye Baby!'],
          album: 'Lullaby Renditions of Elton John'
        },
        {
          name: 'Tiny Dancer',
          artists: ['The White Raven'],
          album: 'Tiny Dancer'
        },
        {
          name: 'Tiny Dancer - Live Album Version',
          artists: ['Ben Folds'],
          album: 'Ben Folds Live'
        }
      ]
    }

    this.refreshResults = this.refreshResults.bind(this)
    this.searchSpotify = this.searchSpotify.bind(this)
  }

  searchSpotify (term) {
    Spotify.accessToken = Spotify.authorize()
    Spotify.search(term)
      .then(results => {
        this.refreshResults(results)
      })
  }

  refreshResults (newTracks) {
    this.setState({ tracks: newTracks })
  }

  addTrack (track) {
    this.setState({ savedTracks: track })
  }

  render () {
    return (
      <div className='App'>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className='App-playlist'>
            <Results tracks={this.state.tracks} />
            <Playlist onChange={this.addTrack} tracks={this.state.savedTracks} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
