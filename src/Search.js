import React, {Component} from 'react'

export default class Search extends Component {
  handleChangeText = (e) => {
    const {searchImages} = this.props

    searchImages(e.target.value, {
      shouldShowTypingMessage: true
    })
  }

  handleSaveSearch = () => {
    const {saveSearch, searchText} = this.props

    if (searchText === '') {
      return
    }

    saveSearch()
  }

  renderSaveSearchContent = () => {
    const {isSearchSaveLoading, shouldShowSuccessMessage, searchText} = this.props
    if (isSearchSaveLoading) {
      return <div className="title save-loading-message">saving...</div>
    } else if (shouldShowSuccessMessage) {
      return <div className="title save-success-message">search saved Successfully!</div>
    }

    return <div
            className={`title save-search-button ${searchText === '' ? 'disabled' : ''}`}
            onClick={this.handleSaveSearch}
           >
            Save this search
           </div>
  }

  handleShowHistory = () => {
    const {togglePreviousSearches} = this.props

    togglePreviousSearches()
  }

  render() {
    const {searchText, isPreviousSearchesVisible} = this.props
    const togglePreviousSearchesButtonText = `${isPreviousSearchesVisible ? 'Hide' : 'Show'} previous`

    return (
      <div>
        <div className="search-container">
          <div className="title">Image Gallery</div>
          <div className="title sub-title">Search for images</div>
          <input type="text" className="search-input" value={searchText} onChange={this.handleChangeText}></input>
          <div className="search-controls">
            {this.renderSaveSearchContent()}
            <div className="title show-history-search-button" onClick={this.handleShowHistory}>
              {togglePreviousSearchesButtonText}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
