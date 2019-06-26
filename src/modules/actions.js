import {loadImages} from '../Utils.js'

export const searchImages = (searchText) => {
  return (dispatch) => {
    if (!searchText) {
      return dispatch({type: 'IMAGES@CLEAR_IMAGES'})
    }

    dispatch({type: 'IMAGES@IMAGES_LOADING'})

    loadImages(searchText).then((images) => {
      dispatch({
        type: 'IMAGES@IMAGES_LOADED_SUCCESS',
        payload: {images}
      })
    })
  }
}

export const saveSearch = (searchText, images) => {
  return (dispatch) => {
    dispatch({type: 'IMAGES@SEARCH_SAVE_LOADING'})

    asyncLocalStorage.getItem('searchResults')
    .then((result) => {
      let searchResults = JSON.parse(result) || {}
      searchResults[searchText] = images

      return asyncLocalStorage.setItem('searchResults', JSON.stringify(searchResults))
    })
    .then(() => {
      dispatch({type: 'IMAGES@SEARCH_SAVE_SUCCESS'})
      setTimeout(() => {
        dispatch({type: 'IMAGES@HIDE_SAVE_SUCCESS_MESSAGE'})
      }, 2000)
    })
  }
}

// I am making this async in order
// to resemble a real database
const asyncLocalStorage = {
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(localStorage.setItem(key, value))
      }, 500)
    })
  },
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(localStorage.getItem(key))
      }, 500)
    })
  }
}
