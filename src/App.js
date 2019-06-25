import React, {Component} from 'react';
import Search from './Search.js';
import {composeImageUrl} from './Utils.js';
import {searchImages} from './modules/actions.js'
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  state = {
    searchText: ''
  }

  searchImages = (searchText) => {
    const {searchImages} = this.props

    this.setState({searchText})
    searchImages(searchText)
  }

  render() {
    const {searchText} = this.state
    const {images, isLoadingNewImages} = this.props

    return (
      <div className="App">
        <Search searchImages={this.searchImages} />
        <div className="images-container">
          {isLoadingNewImages ?
            <div className="message loading-message">loading...</div>
            :
            <ImagesCollection images={images} searchText={searchText} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.imagesData.images,
  isLoadingNewImages: state.imagesData.isLoadingNewImages,
})

const mapDispatchToProps = {searchImages}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const ImagesCollection = ({images, searchText}) => {
  if (!images) {
    return <div className="message">Please search images!</div>
  } else if (images.length === 0) {
    return <div className="message">{`No results for "${searchText}".`}</div>
  } else {
    return images.map((image) => {
      const url = composeImageUrl(image)
      return (<img key={image.id} alt="" className="image-item" src={url} />)
    })
  }
}
