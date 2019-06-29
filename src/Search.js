import React, {Component} from 'react'
import AccessAlarmIcon from '@material-ui/icons/Search'

export default class Search extends Component {
  handleChangeText = (e) => {
    const {searchImages} = this.props

    searchImages(e.target.value, {
      shouldShowTypingMessage: true
    })
  }

  handleSaveSearch = () => {
    const {saveSearch} = this.props

    saveSearch()
  }

  renderSaveSearchContent = () => {
    const {isSearchSaveLoading, shouldShowSuccessMessage} = this.props
    if (isSearchSaveLoading) {
      return <div className="title save-loading-message">saving...</div>
    } else if (shouldShowSuccessMessage) {
      return <div className="title save-success-message">search saved Successfully!</div>
    }

    return <div className="title save-search-button" onClick={this.handleSaveSearch}>Save this search</div>
  }

  render() {
    const {searchText} = this.props

    return (
      <div>
        <div className="search-container">
          <AccessAlarmIcon className="previous-search-button" />
          <div className="title">Image Gallery</div>
          <div className="title sub-title">Search for images</div>
          <input type="text" className="search-input" value={searchText} onChange={this.handleChangeText}></input>
          {this.renderSaveSearchContent()}
        </div>
      </div>
    )
  }
}
