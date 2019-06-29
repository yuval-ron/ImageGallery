import React, {Component} from 'react'
import {connect} from 'react-redux'
import {debounce} from 'lodash'
import Search from './Search.js'
import PreviousSearches from './PreviousSearches.js'
import {composeImageUrl, composeSearchTextAsTags} from './Utils.js'
import {searchImages, saveSearch, showTypingMessage} from './modules/actions.js'
import './App.css'

class App extends Component {
  state = {
    searchText: ''
  }

  searchImages = (searchValue, {searchMode, shouldShowTypingMessage=false}={}) => {
    const {showTypingMessage} = this.props
    const searchText = composeSearchTextAsTags(searchValue)
    const searchModeToDisplay = searchMode ? ` - (${searchMode === 'any' ? 'OR' : 'AND'})` : ''

    this.setState({searchText: `${searchText}${searchModeToDisplay}`})
    debugger
    if (shouldShowTypingMessage) {
      showTypingMessage()
    }

    this.debouncedSearchImages(searchText, searchMode)
  }

  debouncedSearchImages = debounce((searchText, searchMode) => {
    const {searchImages} = this.props

    searchImages(searchText, searchMode)
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

  render() {
    const {isSearchSaveLoading, shouldShowSuccessMessage} = this.props
    return (
      <div className="App">
        <div className="image-gallery">
          <Search
            searchImages={this.searchImages}
            saveSearch={this.saveSearch}
            isSearchSaveLoading={isSearchSaveLoading}
            shouldShowSuccessMessage={shouldShowSuccessMessage}
            searchText={this.state.searchText}
          />
          <div className="images-container">
            {this.renderImagesContainerContent()}
          </div>
        </div>
        <PreviousSearches searchImages={this.searchImages} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  images: state.imagesData.images,
  isLoadingNewImages: state.imagesData.isLoadingNewImages,
  isSearchSaveLoading: state.imagesData.isSearchSaveLoading,
  shouldShowSuccessMessage: state.imagesData.shouldShowSuccessMessage,
  isTypingMessageVisible: state.imagesData.isTypingMessageVisible
})

const mapDispatchToProps = {searchImages, saveSearch, showTypingMessage}

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
