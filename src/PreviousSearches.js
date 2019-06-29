import React, {Component} from 'react'
import { connect } from 'react-redux'
import {loadPreviousSearches} from './modules/actions.js'

class PreviousSearches extends Component {
  state = {
    selectedPreviousItems: []
  }

  componentDidMount () {
    const {loadPreviousSearches} = this.props

    loadPreviousSearches()
  }

  onPreviousSearchSelect = (searchValue, isSelected) => {
    const {selectedPreviousItems} = this.state

    if (isSelected) {
      this.setState({
        selectedPreviousItems: [
          ...selectedPreviousItems,
          searchValue
        ]
      })
    } else {
      const searchToDeleteIndex = selectedPreviousItems.indexOf(searchValue)
      const selectedPreviousItemsAfterDelete = [...selectedPreviousItems]

      selectedPreviousItemsAfterDelete.splice(searchToDeleteIndex, 1)

      this.setState({selectedPreviousItems: selectedPreviousItemsAfterDelete})
    }
  }

  createOnSearchClickCallback = (searchMode) => {
    return () => this.onSearchClick(searchMode)
  }

  onSearchClick = (searchMode) => {
    const {searchImages} = this.props
    const {selectedPreviousItems} = this.state

    searchImages(selectedPreviousItems, {searchMode})
  }

  render() {
    const {previousSearches, isVisible} = this.props
    const {selectedPreviousItems} = this.state

    return (
      <div className={`previous-search-side-bar ${isVisible ? 'visible' : ''}`}>
        <div className="search-options-container">
          <SearchOptionsButtons
            selectedPreviousItems={selectedPreviousItems}
            onSingleSearchClick={this.createOnSearchClickCallback()}
            onUnionSearchClick={this.createOnSearchClickCallback('any')}
            onIntersectionSearchClick ={this.createOnSearchClickCallback('all')}
          />
        </div>
        <div className="previous-searches-list">
          {previousSearches &&
            <PreviousSearchesList
              selectedPreviousItems={selectedPreviousItems}
              onPreviousSearchSelect={this.onPreviousSearchSelect}
              previousSearches={previousSearches}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  previousSearches: state.imagesData.previousSearches
})

const mapDispatchToProps = {loadPreviousSearches}

export default connect(mapStateToProps, mapDispatchToProps)(PreviousSearches)

const PreviousSearchesList = ({previousSearches, onPreviousSearchSelect, selectedPreviousItems}) => {
  if (previousSearches.length === 0) {
    return <div className="no-prev-searches">No previous searches yet</div>
  }

  return Object.keys(previousSearches).map((searchValue, index) => {
    return <PreviousSearchesListItem
             key={`searches-list-item-${index}`}
             isSelected={selectedPreviousItems.includes(searchValue)}
             searchValue={searchValue}
             onPreviousSearchSelect={onPreviousSearchSelect}
           />
  })
}

const PreviousSearchesListItem = ({searchValue, onPreviousSearchSelect, isSelected}) => {
  return (
    <div
     className={`previous-search-item ${isSelected ? 'selected' : ''}`}
     onClick={() => onPreviousSearchSelect(searchValue, !isSelected)}
    >
      <div className="previous-search-label" >{searchValue}</div>
    </div>
  )
}

const SearchOptionsButtons = ({selectedPreviousItems, onSingleSearchClick, onUnionSearchClick, onIntersectionSearchClick}) => {
  const numberOfSelectedPreviousItemsToSearch = Object.keys(selectedPreviousItems).length

  if (numberOfSelectedPreviousItemsToSearch === 1) {
    return (
      <div className="previous-search-controls" onClick={onSingleSearchClick}>
        <div className="search-button">Search</div>
      </div>
    )
  } else if (numberOfSelectedPreviousItemsToSearch > 1) {
    return (
      <div className="previous-search-controls">
        <div className="search-button" onClick={onUnionSearchClick}>Search - "OR"</div>
        <div className="search-button" onClick={onIntersectionSearchClick}>Search - "AND"</div>
      </div>
    )
  }
  else {
    return null
  }
}
