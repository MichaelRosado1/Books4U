import './App.css';
import Header from './Header.js';
import BookCard from './BookCard'
import React from 'react';
import SearchBar from './SearchBar';
import { getSuggestedQuery } from '@testing-library/dom';

require('dotenv').config();

function App() {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

  }

  const handleChange = () => {

  }

  const handleSearch = () => {

  }

  return (
    <div className="App">
      <Header />
      <br />
      <form onSubmit={event => handleSubmit(event)}>
        <SearchBar
          value={query}
          onChange={(newValue) => getSuggestedQuery(newValue)}
          onRequestSearch={() => handleSearch(query)}/>
      </form>
      <br />
      <BookCard Title="Ender's Game" Author="Orson Scott Card" Rating='5' />
    </div>
  );
}
export default App