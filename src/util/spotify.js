/* global fetch */

function encodeData (data) {
  return Object.keys(data).map(key => {
    return [key, data[key]].map(encodeURIComponent).join('=')
  }).join('&')
}

const Spotify = {
  authUri: 'https://accounts.spotify.com/authorize',
  parameters: {
    'client_id': process.env.REACT_APP_CLIENT_ID,
    'response_type': 'token',
    'redirect_uri': 'http://localhost:3000/',
    'scope': 'playlist-modify-public'
  },
  accessToken: '',
  searchUri: 'https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search',

  authorize () {
    if (this.accessToken !== '') {
      // needs a cookie here to remember
      return this.accessToken
    } else if (window.location.hash) {
      let hash = window.location.hash.substring(1).split('&')
      hash = hash.map(item => {
        item = item.split('=')
        return item
      })
      return hash[0][1]
    } else {
      window.location.href = this.authUri + '?' + encodeData(this.parameters)
    }
  },

  search (term) {
    return fetch(this.searchUri + '?q=' + encodeURIComponent(term) + '&type=track&limit=10', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Access-Control-Allow-Origin': 'x-requested-with'
      }
    })
      .then(response => {
        try {
          if (response.ok) {
            console.log(response.status)
            return response.json()
          }
          throw new Error('Request failed!' + response.status + response.text)
        } catch (error) {
          console.log(error)
        }
      })
      .then(json => {
        if (json.tracks.items) {
          return json.tracks.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              artists: item.artists.map(artist => {
                return artist.name
              }),
              album: item.album.name
            }
          })
        }
      })
  }
}

export default Spotify
