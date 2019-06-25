import React, {Component} from 'react';

export default class Search extends Component {
  handleChangeText = (e) => {
    const {searchImages} = this.props;

    searchImages(e.target.value)
  }

  render() {
    return (
      <div>
        <div className="search-container">
          <div className="title">Image Gallery</div>
          <div className="title sub-title">Search for images</div>
          <input type="text" className="search-input" onChange={this.handleChangeText}></input>
        </div>
      </div>
    )
  }
}
