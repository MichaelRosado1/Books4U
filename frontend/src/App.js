import './App.css';
import Header from './Header.js';
import BookCard from './BookCard'
import React from 'react';
import SearchBar from 'material-ui-search-bar';
import { getSuggestedQuery } from '@testing-library/dom';
import axios from 'axios';

require('dotenv').config();

function App() {
  const [results, setResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState();

  function handleSubmit(event){
    event.preventDefault();
    let url = 'http://localhost:3002/search/';
    url += searchTerm;
    console.log(searchTerm)
    axios.get(url)
      .then((response) => {
        setResults(response.data);
      }).catch((e) => console.log(e));
  }

  const handleChange = (searchVal) => {
    setSearchTerm(searchVal.value);
  };

  return (
    <div className="App">
      <Header />
      <br />
      <form onSubmit={event => handleSubmit(event)}>
        <SearchBar
          value={searchTerm}
          onChange={(searchVal) => handleChange(searchVal)}
        />
      </form>
      <br />
      {results.forEach((ob) => {
        <BookCard Title={ob.title} Author={ob.authorName} Rating='5'/>
      })}
    </div>
  );
}
export default App