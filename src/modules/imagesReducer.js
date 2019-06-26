const initialState = {
  images: null,
  isLoadingNewImages: false,
  isSearchSaveLoading: false
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
    case 'IMAGES@SEARCH_SAVE_LOADING': {
      return {
        ...state,
        isSearchSaveLoading: true,
      }
    }
    case 'IMAGES@IMAGES@SEARCH_SAVE_SUCCESS': {
      return {
        ...state,
        isSearchSaveLoading: false,
      }
    }
    default:
      return state
  }
}
