import React from 'react'
import './search-bar.css'

class SearchBar extends React.Component {
  render () {
    return (
      <div className='SearchBar'>
        <input placeholder='Enter A Song Title' />
        <a>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar
