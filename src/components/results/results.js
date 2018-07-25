import React from 'react'
import TrackList from '../track-list/track-list'
import './results.css'

class Results extends React.Component {
  render () {
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <TrackList />
      </div>
    )
  }
}

export default Results
