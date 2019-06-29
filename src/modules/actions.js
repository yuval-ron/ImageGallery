import {loadImages} from '../Utils.js'

export const loadPreviousSearches = () => {
  return (dispatch) => {
    asyncLocalStorage.getItem('previousSearches')
      .then((result) => {
        const previousSearches = JSON.parse(result) || []
        dispatch({
          type: 'IMAGES@LOAD_PREVIOUS_SEARCHES_SUCCESS',
          payload: {previousSearches}
        })
      })
  }
}

export const searchImages = (searchText, searchMode) => {
  return (dispatch) => {
    if (!searchText) {
      return dispatch({type: 'IMAGES@CLEAR_IMAGES'})
    }

    dispatch({type: 'IMAGES@IMAGES_LOADING'})

    loadImages(searchText, searchMode).then((images) => {
      dispatch({
        type: 'IMAGES@IMAGES_LOADED_SUCCESS',
        payload: {images}
      })
    })
  }
}

export const showTypingMessage = () => {
  return {type: 'IMAGES@SHOW_TYPING_MESSAGE'}
}

export const saveSearch = (searchText) => {
  return (dispatch) => {
    dispatch({type: 'IMAGES@SEARCH_SAVE_LOADING'})

    asyncLocalStorage.getItem('previousSearches')
      .then((result) => {
        const previousSearches = JSON.parse(result) || []

        previousSearches.push(searchText)
        return asyncLocalStorage.setItem('previousSearches', JSON.stringify(previousSearches))
      })
      .then(() => {
        dispatch({
          type: 'IMAGES@SEARCH_SAVE_SUCCESS',
          payload: {searchText}
        })

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
