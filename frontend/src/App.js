import './App.css';
import Header from './Header.js';
import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import API from "./MockData";
import SearchBar from './SearchBar';
import { getSuggestedQuery } from '@testing-library/dom';
import { cardActionAreaClasses, cardHeaderClasses, Rating } from '@mui/material';

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


  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3002')
      .then((response) => {
        setPost(response.data.message);
      });
  }, []);

  const[ISBN] = useState(''); 
  const[UserId] = useState(''); 
  const [list, setList] = useState(API);
  const [Rating, setRating] = useState(API);


  /* Insert */   
  const addToList = i => {
    axios.post('http://localhost:3002/api/insert', {
      UserId: UserId, 
      ISBN: ISBN
    }).then(() => {
      alert('success insert')
    })
  };

  /*Update*/
  const updateRating = i => {
    axios.post('http://localhost:3002/api/update', {
      UserId: UserId, 
      Rating: Rating, 
    }).then(() => {
      alert('success insert')
    })
  };

  /* Delete */   
  const removeFromList = i => {
    axios.delete('http://localhost:3002/api/delete', {
      ISBN: ISBN, 

    }).then(() => {
      alert('success insert')
    })
  };

  const returnBooks = () => (
    list.map((item, i) => (
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
			    {item.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
			    {post}
        </Typography>
        <Typography variant="body2">
			    Rating: {item.rating}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to List {() => addToList(i)} </Button>
        <Button size="small">Remove from List {() => removeFromList(i)}</Button>
        <label> Edit Rating </label>
        <input type= "text" name="Review" />
        <Button size="small"> Submit </Button>
      </CardActions>
    </Card>
  )));  

  const returnToReadList = () => (
    <React.Fragment>
      <Typography variant="h5" component="div">My List </Typography>
        {list.map((item, i) => (
          <Card sx={{ minWidth: 275 }}>
            {item.inList && (
              <><CardContent>
                <Typography variant="h5" component="div">{item.title} </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary"> {post} </Typography>
                <Typography variant="body2"> Rating: {item.rating} </Typography>
              </CardContent><CardActions>
                  <Button size="small">Remove from List {() => removeFromList(i)}</Button>
                  <Button size="small">Edit Rating {() => updateRating(i)}</Button>
                </CardActions></>
            )}
          </Card>
          ))}
  </React.Fragment>
  )

  return (
    <div className="App">
      <Header />
      <br />
      {returnToReadList()}
      <form onSubmit={event => handleSubmit(event)}>
        <SearchBar
          value={searchTerm}
          onChange={(searchVal) => handleChange(searchVal)}
        />
      </form>
      {returnBooks()}
      <br />
{/*       {(searchMade === true ? results.forEach((ob) => {
        <BookCard Title={ob.title} Author={ob.authorName} Rating='5'/>
      }) : <h1> Search to see results </h1>)} */}
    </div>
  );
}
export default App