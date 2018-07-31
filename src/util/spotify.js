/* global fetch */

// used for creating a query string from an object
function encodeData (data) {
  return Object.keys(data).map(key => {
    return [key, data[key]].map(encodeURIComponent).join('=')
  }).join('&')
}

const Spotify = {
  accessToken: '',
  userId: '',

  authorize () {
    if (this.accessToken !== '') {
      // the accessToken has already been set this session
      // needs a cookie to remember this (if it should at all)?
      return this.accessToken
    } else if (window.location.hash) {
      // the page is redirected from spotify authorization page
      // retrieve the hash part of the url and split into key and value pairs
      let hash = window.location.hash.substring(1).split('&')
      hash = hash.map(item => {
        item = item.split('=')
        return item
      })
      // return the access_token value from the array
      return hash[0][1]
    } else {
      // No authorization has been done, redirect to spotify endpoint
      const endpoint = 'https://accounts.spotify.com/authorize'
      const parameters = {
        // client_id stored in .env
        'client_id': process.env.REACT_APP_CLIENT_ID,
        'response_type': 'token',
        'redirect_uri': 'http://localhost:3000/',
        'scope': 'playlist-modify-public'
      }
      window.location.href = endpoint + '?' + encodeData(parameters)
    }
  },

  // Search spotify for matching tracks
  search (term) {
    this.accessToken = this.authorize()
    return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?q=' + encodeURIComponent(term) + '&type=track&limit=10', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Access-Control-Allow-Origin': 'x-requested-with'
      }
    })
      .then(response => {
        try {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Request failed with error code ' + response.status + '\n' + JSON.stringify(response.json()))
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
  },

  // retrieve spotify user ID to create and populate playlists.
  fetchUserId () {
    if (this.userId) {
      return new Promise((resolve, reject) => {
        resolve(this.userId)
      })
    }
    this.accessToken = this.authorize()
    return fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Access-Control-Allow-Origin': 'x-requested-with'
      }
    })
      .then(response => {
        try {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Request failed with error code ' + response.status)
        } catch (error) {
          console.log(error)
        }
      })
      .then(user => {
        if (user.id) {
          this.userId = user.id
          return user.id
        }
      })
  },

  // create an empty playlist with custom name
  createPlaylist (playlistName) {
    let json = JSON.stringify({ 'name': playlistName })
    let parameters = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'x-requested-with'
      },
      body: json
    }
    return this.fetchUserId()
      .then(userId => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userId}/playlists`, parameters)
          .then(response => {
            try {
              if (response.ok) {
                return response.json()
              }
              throw new Error('Request failed with error code ' + response.status)
            } catch (error) {
              console.log(error)
            }
          })
          .then(playlist => {
            if (playlist.id) {
              return playlist
            }
          })
      })
  },

  // takes an array of track objects and creates a new playlist
  populatePlaylist (playlistName, tracks) {
    let uris = []
    // iterate over tracks array and push spotify URIs
    tracks.forEach(track => {
      uris.push('spotify:track:' + track.id)
    })
    const json = JSON.stringify({ 'uris': uris })
    let parameters = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'x-requested-with'
      },
      body: json
    }
    this.createPlaylist(playlistName)
      .then(playlist => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${playlist.owner.id}/playlists/${playlist.id}/tracks`, parameters)
          .then(response => {
            try {
              if (response.ok) {
                return response.json()
              }
              throw new Error('Request failed with error code ' + response.status)
            } catch (error) {
              console.log(error)
            }
          })
          .then(playlistSnapshot => {
            if (playlistSnapshot.snaphot_id) {
              return playlistSnapshot
            }
          })
      })
  }
}

export default Spotify
