import React, { Component } from 'react'
import SearchBar from './components/search-bar/search-bar'
import Results from './components/results/results'
import Playlist from './components/playlist/playlist'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className='App'>
          <SearchBar />
          <div className='App-playlist'>
            <Results />
            <Playlist />
          </div>
        </div>
      </div>
    )
  }
}

export default App
