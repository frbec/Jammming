import React from 'react'
import Track from '../track/track'
import './track-list.css'

const tracks = [
  {
    title: 'Tiny Dancer',
    artist: 'Elton John',
    album: 'Madman Across the Water'
  },
  {
    title: 'Tiny Dancer',
    artist: 'Tim McGraw',
    album: 'Love Story'
  },
  {
    title: 'Tiny Dancer',
    artist: 'Rockabye Baby!',
    album: 'Lullaby Renditions of Elton John'
  },
  {
    title: 'Tiny Dancer',
    artist: 'The White Raven',
    album: 'Tiny Dancer'
  },
  {
    title: 'Tiny Dancer - Live Album Version',
    artist: 'Ben Folds',
    album: 'Ben Folds Live'
  }
]

class TrackList extends React.Component {
  render () {
    return (
      <div className='TrackList'>
        <Track />
        <Track />
        <Track />
        <Track />
        <Track />
      </div>
    )
  }
}

export default TrackList
