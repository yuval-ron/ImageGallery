import {loadImages} from '../Utils.js';

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
