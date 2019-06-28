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

  onPreviousSearchSelect = (e) => {
    const {previousSearches} = this.props
    const {selectedPreviousItems} = this.state

    if (e.target.checked) {
      this.setState({
        selectedPreviousItems: [
          ...selectedPreviousItems,
          e.target.id
        ]
      })
    } else {
      const searchToDeleteIndex = selectedPreviousItems.indexOf(e.target.id)
      const selectedPreviousItemsAfterDelete = [...selectedPreviousItems]
      selectedPreviousItemsAfterDelete.splice(searchToDeleteIndex, 1)

      this.setState({selectedPreviousItems: selectedPreviousItemsAfterDelete})
    }
  }

  onSearchClick = () => {
    const {onPreviousSearchClick, previousSearches} = this.props
    const {selectedPreviousItems} = this.state

    const [previousSearchText] = selectedPreviousItems
    const previousSearchValues = previousSearches[previousSearchText]
    onPreviousSearchClick(previousSearchText, previousSearchValues)
  }

  onUnionSearchClick = () => {
    const {onPreviousSearchClick, previousSearches} = this.props
    const {selectedPreviousItems} = this.state

    const unionImages = {}
    selectedPreviousItems.forEach((selectedPreviousItemText) => {
      const currentPreviousSearchResults = previousSearches[selectedPreviousItemText]
      currentPreviousSearchResults.forEach(image => unionImages[image.id] = image)
    })
    const previousSearchText = selectedPreviousItems.map(text => `"${text}"`)
    onPreviousSearchClick(previousSearchText.join(' OR '), unionImages)
  }

  onIntersectionSearchClick = () => {
  }

  render() {
    const {previousSearches} = this.props
    const {selectedPreviousItems} = this.state

    return (
      <div className="previous-search-side-bar">
        <div className="search-options-container">
          <SearchOptionsButtons
            selectedPreviousItems={selectedPreviousItems}
            onSearchClick={this.onSearchClick}
            onUnionSearchClick={this.onUnionSearchClick}
            onIntersectionSearchClick ={this.onIntersectionSearchClick}
          />
        </div>
        <div className="previous-searches-list">
          {previousSearches &&
            <PreviousSearchesList
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

const PreviousSearchesList = ({previousSearches, onPreviousSearchSelect}) => {
  const previousSearchesKeys = Object.keys(previousSearches)

  return previousSearchesKeys.map((searchValue, index) => {
    return <PreviousSearchesListItem
             key={`searches-list-item-${index}`}
             searchValue={searchValue}
             onPreviousSearchSelect={onPreviousSearchSelect}
           />
  })
}

const PreviousSearchesListItem = ({searchValue, onPreviousSearchSelect}) => {
  return (
    <div className="previous-search-item">
      <div className="previous-search-label">{searchValue}</div>
      <input
       type="checkbox"
       id={searchValue}
       className="previous-search-checkbox"
       onChange={onPreviousSearchSelect} />
    </div>
  )
}

const SearchOptionsButtons = ({selectedPreviousItems, onSearchClick, onUnionSearchClick, onIntersectionSearchClick}) => {
  const numberOfSelectedPreviousItemsToSearch = Object.keys(selectedPreviousItems).length

  if (numberOfSelectedPreviousItemsToSearch === 1) {
    return <div className="search" onClick={onSearchClick}>Search</div>
  } else if (numberOfSelectedPreviousItemsToSearch > 1) {
    return (
      <div className="multi-search-container">
        <div className="union-search" onClick={onUnionSearchClick}>Search - "OR"</div>
        <div className="intersection-search" onClick={onIntersectionSearchClick}>Search - "AND"</div>
      </div>
    )
  }
  else {
    return null
  }
}
