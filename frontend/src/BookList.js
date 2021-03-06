import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios'

import API from "./MockData";
/** The List to Display Results after Searching */
/***
 * @IMPORTANT
  
 pass props to this 
If you get an error in the console of the chrome tab you are trying to see the site on
  that is something along the lines of:
    'Access to XMLHttpRequest at 'http://localhost:3002/author' 
    from origin 'http://localhost:3000' has been blocked by CORS policy: 
    No 'Access-Control-Allow-Origin' header is present on the requested 
    resource'
    Download the chrome extension called 'Allow CORS: Access-Control-Allow-Origin'
    When you are on the chrome tab, click the extension and select the toggle
    on and reload the page, the get request should go through. 
 ***/

export default function BasicCard(props) {

  const [list, setList] = useState();
  


  const addToList = i => {
    setList(prevState =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
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
            count: 0,
            inList: false
          };
        }
        return item;
      })
    );
  };

	let Title = props.Title;
	let Rating = props.Rating;

  const [post, setPost] = React.useState(null);

  // React.useEffect(() => {
  //   axios.get('http://localhost:3002')
  //     .then((response) => {
  //       setPost(response.data.message);
  //     });
  // }, []);

  let Author = props.Author;
  let ISBN = props.ISBN;
  const [newRating, setNewRating] = useState("");

  const updateRating = (ISBN) => {
    Axios.put(`http://localhost:3002/api/update`, {
      ISBN: ISBN,
      Rating: newRating
    });
    setNewRating("")
  };

  const deleteReview = (ISBN) => {
    Axios.delete(`http://localhost:3002/api/delete/${ISBN}`);
  };


  const returnBooks = () => (
    // list.map((item, i) => (
      <Card onClickAway={() => {}} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
			    {props.Title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
			    {props.Author}
        </Typography>
        <Typography variant="body2">
          <br />
        </Typography>
      </CardContent>
      <CardActions disableBackDripClick>
        <Button size="small">Add to List {() => addToList()} </Button>
        <Button size="small" onClick={() => { deleteReview(ISBN) }}>Remove from List</Button>
        <form>
          <label >Edit Rating</label>
          <input value = {newRating} type="text" name="Rating" onChange={(e) => {
            e.preventDefault();
            setNewRating(e.target.value)
          }}/>
          <button onClick={(e) => {
                    e.preventDefault();
                    updateRating(ISBN);
                }}> Update</button>
        </form>
      </CardActions>
    </Card>
    );    
      



  //if no data is returned we shouldn't display anything
   return (
    returnBooks()
  );
}