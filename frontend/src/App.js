import './App.css';
import Header from './Header.js';
import BookCard from './BookCard'
import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import axios from 'axios';

require('dotenv').config();

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMade, setSearchMade] = useState(false);
  function handleSubmit(event){
    event.preventDefault();
    setSearchMade(true);
    let url = 'http://localhost:3002/search/';
    url += searchTerm;
    axios.get(url)
      .then((response) => {
        setResults(response.data);
      }).catch((e) => console.log(e));
  }

  const handleChange = (searchVal) => {
    console.log(searchVal);
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
      {(searchMade === true ? results.forEach((ob) => {
        <BookCard Title={ob.title} Author={ob.authorName} Rating='5'/>
      }) : <h1> Search to see results </h1>)}
    </div>
  );
}
export default App