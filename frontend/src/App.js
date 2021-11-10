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
import { cardActionAreaClasses, cardHeaderClasses } from '@mui/material';

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


  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3002')
      .then((response) => {
        setPost(response.data.message);
      });
  }, []);


  const [list, setList] = useState(API);

  const addToList = i => {
    setList(prevState =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inList: true
          };
        }
        return item;
      })
    );
  };

  const removeFromList = i => {
    setList(prevList =>
      prevList.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inList: false
          };
        }
        return item;
      })
    );
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
                  <Button size="small">Edit Rating</Button> {/** Add functionality */}
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
      <form onSubmit={event => handleSubmit(event)}>
        {returnToReadList()}
        <SearchBar /** Add functionality */
          value={query}
          onChange={(newValue) => getSuggestedQuery(newValue)}
          onRequestSearch={() => handleSearch(query)}/>
      </form>
      <br />
      {returnBooks()}
    </div>
  );
}
export default App