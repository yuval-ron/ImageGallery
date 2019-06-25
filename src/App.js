import React, {Component} from 'react';
import Search from './Search.js';
import {loadImages, composeImageUrl} from './Utils.js';
import './App.css';

export default class App extends Component {
  state = {
    searchText: '',
    images: null,
    isLoadingNewImages: false
  }

  searchImages = (searchText) => {
    if (!searchText) {
      return this.setState({
        searchText,
        images: null,
        isLoadingNewImages: false
      })
    }

    this.setState({isLoadingNewImages: true, searchText})

    loadImages(searchText).then((images) => {
      this.setState({
        images,
        isLoadingNewImages: false,
      })
    })
  }

  render() {
    const {images, isLoadingNewImages, searchText} = this.state

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
