const initialState = {
  images: null,
  currentPage: null,
  totalPages: null,
  isLoadingNewImages: false,
  isSearchSaveLoading: false,
  shouldShowSuccessMessage: false,
  isTypingMessageVisible: false,
  previousSearches: []
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
        isTypingMessageVisible: false,
        images: payload.images,
        currentPage: payload.page,
        totalPages: payload.pages
      }
    }
    case 'IMAGES@IMAGES_LOADED_MORE_SUCCESS': {
      return {
        ...state,
        isLoadingNewImages: false,
        isTypingMessageVisible: false,
        currentPage: payload.page,
        totalPages: payload.pages,
        images: [
          ...state.images,
          ...payload.images
        ]
      }
    }
    case 'IMAGES@CLEAR_IMAGES': {
      return {
        ...state,
        isLoadingNewImages: false,
        isTypingMessageVisible: false,
        images: null
      }
    }
    case 'IMAGES@SEARCH_SAVE_LOADING': {
      return {
        ...state,
        isSearchSaveLoading: true,
        isTypingMessageVisible: false
      }
    }
    case 'IMAGES@SHOW_TYPING_MESSAGE': {
      return {
        ...state,
        isTypingMessageVisible: true
      }
    }
    case 'IMAGES@SEARCH_SAVE_SUCCESS': {
      return {
        ...state,
        isSearchSaveLoading: false,
        shouldShowSuccessMessage: true,
        previousSearches: [
          ...state.previousSearches,
          payload.searchText
        ]
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
