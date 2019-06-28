const initialState = {
  images: null,
  isLoadingNewImages: false,
  isSearchSaveLoading: false,
  shouldShowSuccessMessage: false
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
    case 'IMAGES@SEARCH_SAVE_SUCCESS': {
      return {
        ...state,
        isSearchSaveLoading: false,
        shouldShowSuccessMessage: true,
      }
    }
    case 'IMAGES@HIDE_SAVE_SUCCESS_MESSAGE': {
      return {
        ...state,
        shouldShowSuccessMessage: false
      }
    }
    case 'IMAGES@LOAD_PREVIOUS_SEARCHES_SUCCESS': {
      return {
        ...state,
        previousSearches: payload.previousSearches
      }
    }
    default:
      return state
  }
}
