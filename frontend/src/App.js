import './App.css';
import ButtonAppBar from './Header.js';
import BookCard from './BookCard'
import React from 'react';

function App() {
  return (
    <div className="App">
      <p>Hello World</p>
      <ButtonAppBar/>
      <BookCard Title="Ender's Game" Author="Orson Scott Card" Rating='5' />

    </div>
  );
}
export default App