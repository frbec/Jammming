import React from 'react'
import './track.css'

class Track extends React.Component {
  render () {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>Tiny Dancer - Live Album Version</h3>
          <p>Ben Folds | Ben Folds Live</p>
        </div>
        <a className='Track-action'>+</a>
      </div>
    )
  }
}

export default Track
