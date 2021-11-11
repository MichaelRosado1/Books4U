import './App.css';
import Header from './Header.js';
import BookCard from './BookCard'
import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';

require('dotenv').config();

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMade, setSearchMade] = useState(false);

  useEffect( () => {
    setSearchMade(true);
  }, [results]);

  async function handleSubmit(event){
    event.preventDefault();
    let url = 'http://localhost:3002/search/';
    url += searchTerm;
    await axios.get(url)
      .then((response) => {
        setResults(response.data);
      }).catch((e) => console.log(e));
  }

  const handleChange = (searchVal) => {
    setSearchTerm(searchVal);
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
      {results.length > 0 ? (results.map((ob) => { 
         <BookCard Title={ob[0].title} Author={ob[0].authorName} Rating='5'/> 
      })) : (
        <h1>nothing found</h1>
      )}
    </div> 

  );
}
export default App