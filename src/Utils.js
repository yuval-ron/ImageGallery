export const loadImages = (text) => {
  const urlForSearch = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${text}`

  return fetch(urlForSearch)
    .then(response => response.json())
    .then(data => data.photos.photo)
    .catch(error => console.error(error))
}

export const composeImageUrl = ({farm, server, id, secret}) => {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
}
