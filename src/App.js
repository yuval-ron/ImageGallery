import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debounce} from 'lodash'
import Search from './Search.js'
import PreviousSearches from './PreviousSearches.js'
import {composeImageUrl, composeSearchTextAsTags} from './Utils.js'
import {searchImages, loadMoreImages, saveSearch, showTypingMessage, togglePreviousSearches} from './modules/actions.js'
import './App.css'

class App extends Component {
  state = {
    searchText: '',
    isInfiniteScrollingEnded: false
  }

  componentDidMount() {
    this.imagesContainerRef.onscroll = (e) => {
      const isScrollEnded = (this.imagesContainerRef.scrollTop + this.imagesContainerRef.offsetHeight) === this.imagesContainerRef.scrollHeight
      const isScrollExist = this.imagesContainerRef.scrollHeight > this.imagesContainerRef.offsetHeight

      if (isScrollExist && isScrollEnded) {
        this.loadMoreImages()
      }
    }
  }

  loadMoreImages = () => {
    const {currentPage, totalPages, loadMoreImages} = this.props
    const {searchText} = this.state

    if (currentPage < totalPages) {
      loadMoreImages(searchText, currentPage + 1)
    }
    else {
      this.setState({isInfiniteScrollingEnded: true})
    }
  }

  searchImages = (searchValue, {searchMode, shouldShowTypingMessage=false, page}={}) => {
    const {showTypingMessage} = this.props
    const searchText = composeSearchTextAsTags(searchValue)
    const searchModeToDisplay = searchMode ? ` - (${searchMode === 'any' ? 'OR' : 'AND'})` : ''

    this.setState({
      searchText: `${searchText}${searchModeToDisplay}`,
      isInfiniteScrollingEnded: false
    })
    if (shouldShowTypingMessage) {
      showTypingMessage()
    }

    this.debouncedSearchImages(searchText, searchMode, page)
  }

  debouncedSearchImages = debounce((searchText, searchMode, page) => {
    const {searchImages} = this.props

    searchImages(searchText, searchMode, page)
  }, 500)

  saveSearch = () => {
    const {searchText} = this.state
    const {saveSearch} = this.props

    saveSearch(searchText)
  }

  renderImagesContainerContent = () => {
    const {images, isLoadingNewImages, isTypingMessageVisible} = this.props
    const {searchText} = this.state

    if (isLoadingNewImages) {
      return <div className="message loading-message">loading...</div>
    }
    return <ImagesCollection images={images} searchText={searchText} isTypingMessageVisible={isTypingMessageVisible} />
  }

  setImageContainerRef = ref => {
    this.imagesContainerRef = ref
  }

  render() {
    const {isSearchSaveLoading, shouldShowSuccessMessage, togglePreviousSearches, isPreviousSearchesVisible} = this.props
    const {isInfiniteScrollingEnded} = this.state
    return (
      <div className="App">
        <div className="image-gallery">
          <Search
            searchImages={this.searchImages}
            saveSearch={this.saveSearch}
            isSearchSaveLoading={isSearchSaveLoading}
            shouldShowSuccessMessage={shouldShowSuccessMessage}
            searchText={this.state.searchText}
            togglePreviousSearches={togglePreviousSearches}
            isPreviousSearchesVisible={isPreviousSearchesVisible}
          />
          <div className="images-container" ref={this.setImageContainerRef}>
            {this.renderImagesContainerContent()}
            {isInfiniteScrollingEnded &&
              <div className="no-more-results message">No more images to show</div>
            }
          </div>
        </div>
        <PreviousSearches searchImages={this.searchImages} isVisible={isPreviousSearchesVisible} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  images: state.imagesData.images,
  currentPage: state.imagesData.currentPage,
  totalPages: state.imagesData.totalPages,
  isLoadingNewImages: state.imagesData.isLoadingNewImages,
  isSearchSaveLoading: state.imagesData.isSearchSaveLoading,
  isPreviousSearchesVisible: state.imagesData.isPreviousSearchesVisible,
  shouldShowSuccessMessage: state.imagesData.shouldShowSuccessMessage,
  isTypingMessageVisible: state.imagesData.isTypingMessageVisible
})

const mapDispatchToProps = {searchImages, loadMoreImages, saveSearch, showTypingMessage, togglePreviousSearches}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const ImagesCollection = ({images, searchText, isTypingMessageVisible}) => {
  if (isTypingMessageVisible) {
    return <div className="message">Typing... :)</div>
  } else if (!images) {
    return <div className="message">Please search images!</div>
  } else if (images.length === 0) {
    return <div className="message">{`No results for "${searchText}".`}</div>
  } else {
    return Object.keys(images).map((imageId) => {
      const image = images[imageId]

      const url = composeImageUrl(image)
      return (<img key={image.id} alt="" className="image-item" src={url} />)
    })

  }
}
