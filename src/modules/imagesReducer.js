const initialState = {
  images: null,
  isLoadingNewImages: false
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'IMAGES@IMAGES_LOADING': {
      return {
        ...state,
        isLoadingNewImages: true
      }
    }
    case 'IMAGES@IMAGES_LOADED_SUCCESS': {
      return {
        ...state,
        isLoadingNewImages: false,
        images: payload.images
      }
    }
    case 'IMAGES@CLEAR_IMAGES': {
      return {
        ...state,
        isLoadingNewImages: false,
        images: null
      }
    }
    default:
      return state;
  }
}
