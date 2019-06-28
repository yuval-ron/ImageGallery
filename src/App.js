import React, {Component} from 'react'
import { connect } from 'react-redux'
import Search from './Search.js'
import PreviousSearches from './PreviousSearches.js'
import {composeImageUrl} from './Utils.js'
import {searchImages, saveSearch} from './modules/actions.js'
import './App.css'

class App extends Component {
  state = {
    searchText: ''
  }

  searchImages = (searchText, previousSearchValues) => {
    const {searchImages} = this.props

    this.setState({searchText})
    searchImages(searchText, previousSearchValues)
  }

  saveSearch = () => {
    const {searchText} = this.state
    const {saveSearch, images} = this.props

    saveSearch(searchText, images)
  }

  onPreviousSearchClick = (previousSearchText, previousSearchValues) => {
    this.searchImages(previousSearchText, previousSearchValues)
  }

  renderImagesContainerContent = () => {
    const {images, isLoadingNewImages} = this.props
    const {searchText} = this.state

    if (isLoadingNewImages) {
      return <div className="message loading-message">loading...</div>
    } else if (images) {
        return <ImagesCollection images={images} searchText={searchText} />
    }
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
        <PreviousSearches onPreviousSearchClick={this.onPreviousSearchClick} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  images: state.imagesData.images,
  isLoadingNewImages: state.imagesData.isLoadingNewImages,
  isSearchSaveLoading: state.imagesData.isSearchSaveLoading,
  shouldShowSuccessMessage: state.imagesData.shouldShowSuccessMessage
})

const mapDispatchToProps = {searchImages, saveSearch}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const ImagesCollection = ({images, searchText}) => {
  if (!images) {
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
