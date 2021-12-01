import './App.css';
import Header from './Header.js';
import BookCard from './BookCard'
import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import Axios from 'axios';

require('dotenv').config();

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMade, setSearchMade] = useState(false);
  
  useEffect( () => {
    let url = "http://localhost:3002/search/" 
    url += searchTerm;
    Axios.get(url).then((response) => {
      setResults(response.data);
      console.log(response.data);
    })
  }, [searchMade]);

  function handleSubmit(event){
    event.preventDefault();
    setSearchMade(true);
    // let url = 'http://localhost:3002/search/';
    // url += searchTerm;
    // axios.get(url)
    //   .then((response) => {
    //     setResults(response.data);
    //   }).catch((e) => console.log(e));
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
          onCancelSearch={() => setResults([])} 
        />
      </form>
      <br />
      {results.map((val) => {
        return (
          <div className='card'>
            <BookCard Title={val.title} Author={val.authorName} Rating={val.rating} />
          </div>
        )
      })}
    </div> 

  );
}
export default App