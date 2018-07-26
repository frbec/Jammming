/* global fetch */

function encodeData (data) {
  return Object.keys(data).map(key => {
    return [key, data[key]].map(encodeURIComponent).join('=')
  }).join('&')
}

const Spotify = {
  authorize (redirectUri) {
    const uri = 'https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize'
    const parameters = {
      'client_id': process.env.REACT_APP_CLIENT_ID,
      'response_type': 'token',
      'redirect_uri': redirectUri,
      'scope': 'playlist-modify-public'
    }
    const request = uri + '?' + encodeData(parameters)
    return fetch(request, {
      redirect: 'follow',
      headers: {
        'Access-Control-Allow-Origin': 'x-requested-with, x-requested-by'
      }
    }
    )
      .then(response => {
        try {
          if (response.ok) {
            return response.text()
          }
          throw new Error('Request failed')
        } catch (error) {
          console.log(error)
        }
      }).then(text => {
        let win = window.open('', 'Spotify', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200')
        console.log(text)
        win.document.body.innerHTML = text
      })
  },

  search (term) {
    // some API call
    console.log(term)
  }
}

export default Spotify
