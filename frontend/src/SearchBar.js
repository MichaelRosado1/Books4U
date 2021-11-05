import React from 'react';
import SearchBar from 'material-ui-search-bar';
//import appStore from './appStore';

// this is re-rendered whenever the relevant parts of the used data stores change
// {appStore.isLoading && <LinearProgress />}
const Search = () => (
  <div className="searchbar">
    <SearchBar
        onChange={() => console.log("onChange")}
        onRequestSearch={() => console.log("onRequestSearch")}
    />
  </div>
);

export default Search;
