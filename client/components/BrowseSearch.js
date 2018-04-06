import React from 'react';
import history from '../history';
import {connect} from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';
// import isEqual from 'lodash.isequal';
import {fetchSearchKeywords, fetchSearchItems, addFavorite, deleteFavorite} from '../store';
import {ItemsGrid} from './index';
import {stylesBrowseSearch as styles} from '../styling/inlineStyles';

/*///
 COMPONENT
*////
class BrowseSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      completedQuery: '',
      searching: false,
      completedFirstSearch: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  componentDidMount() {
    if (history.windowY) {
      window.scrollTo(0, history.windowY);
    }
    if (history.location.pathname === '/browse/search') {
      this.props.handleFetchSearchKeywords();
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (!isEqual(this.props.items, nextProps.items)) { }
    this.setState({
      searching: false,
    });
  }

  handleInputChange(input) {
    this.setState({query: input});
  }

  handleInputSubmit(searchKeywordsString) {
    const {query} = this.state;
    this.setState({
      completedQuery: query,
      searching: true,
      completedFirstSearch: true,
      query: '',
    });
    this.props.handleFetchSearchItems(searchKeywordsString.toLowerCase());
  }

  filterInputSuggestions(input, searchKeyword) {
    let match = false;
    if (!input) return match;
    input.split(' ').forEach(word => {
      if (word.length >= 3) {
        match = searchKeyword.toLowerCase().includes(word.toLowerCase()) ?
          true : match;
      } else {
        match = searchKeyword.toLowerCase().startsWith(word.toLowerCase()) ?
          true : match;
      }
    });
    return match;
  }

  render() {

    const { items, searchKeywordNames, toggleFavorite } = this.props;
    const { query, completedQuery, searching, completedFirstSearch } = this.state;

    return (
      <div>
        <div style={styles.root}>
          <AutoComplete
            floatingLabelText={
              <span>
                <SearchIcon style={styles.browseIcon} />
                <span>Search Keywords:</span>
              </span>
            }
            openOnFocus={false}
            maxSearchResults={5}
            dataSource={searchKeywordNames || []}
            filter={this.filterInputSuggestions}
            onUpdateInput={this.handleInputChange}
            onNewRequest={this.handleInputSubmit}
            searchText={query}
            className="browse-search-input"
            style={styles.browseSearchInput}
            floatingLabelStyle={{color: '#222'}}
            textFieldStyle={{width: '100%'}}
            menuStyle={{backgroundColor: '#f6f3eb'}}
          />
        </div>
        <div style={styles.root}>
        { items && items.length ?
            (completedQuery ?
              <h3>Items matching your search (
                <span style={{color: '#c2a661'}}>
                  {completedQuery}
                </span>):
              </h3>
              : <h3>Items matching your search:</h3>
            )
            : null
        }
        </div>
        <ItemsGrid
          items={items}
          toggleFavorite={toggleFavorite}
        />
        <div style={styles.root}>
        { items && items.length === 0 && !completedFirstSearch && !searching &&
            <h3> Items matching your search will display here. </h3>
        }
        { (searching || !items) ?
            <CircularProgress
              className="spinner"
              size={60}
              thickness={4.5}
              color="#c2a661"
              style={{margin: '20px auto'}}
            />
            : null
        }
        { items && items.length === 0 && completedFirstSearch && !searching &&
            (completedQuery ?
              <h3> There are no items matching your search (
                <span style={{color: '#c2a661'}}>
                  {completedQuery}
                </span>). Try again.
              </h3>
              : <h3> There are no items matching your search. Try again.</h3>
            )
        }
        </div>
      </div>
    );
  }
}

/*///
 CONTAINER
*////

const mapState = state => ({
  items: state.searchStore.searchItems,
  searchKeywords: state.searchStore.searchKeywords,
  searchKeywordNames: state.searchStore.searchKeywordNames,
});

const mapDispatch = dispatch => ({
  toggleFavorite: (favorite, key) => {
    if (favorite) {
      dispatch(deleteFavorite(key));
    } else {
      dispatch(addFavorite(key));
    }
  },
  handleFetchSearchKeywords: () => {
    dispatch(fetchSearchKeywords());
  },
  handleFetchSearchItems: (searchKeywordsString) => {
    dispatch(fetchSearchItems({searchKeywordsString}));
  },
});

export default connect(mapState, mapDispatch)(BrowseSearch);
