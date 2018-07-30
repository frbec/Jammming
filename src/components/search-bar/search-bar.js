import React from 'react'
import './search-bar.css'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      term: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    this.setState({ term: e.target.value })
  }

  handleSearch (e) {
    this.props.searchSpotify(this.state.term)
    e.preventDefault()
  }

  handleFocus (e) {
    e.target.setSelectionRange(0, e.target.value.length)
  }

  render () {
    return (
      <div className='SearchBar'>
        <input onFocus={this.handleFocus} onChange={this.handleChange} placeholder='Enter A Song Title' />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar
