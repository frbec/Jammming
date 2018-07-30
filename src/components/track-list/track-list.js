import React from 'react'
import Track from '../track/track'
import './track-list.css'

class TrackList extends React.Component {
  render () {
    return (
      <div className='TrackList'>
        {this.props.tracks.map(track => <Track moveTrack={this.props.moveTrack} key={track.id} info={track} />)}
      </div>
    )
  }
}

export default TrackList
