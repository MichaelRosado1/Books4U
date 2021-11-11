import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";
import Search from "./SearchBar";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BookCard from "./BookList"; 
import API from "./MockData";
import AuthorCard from "./AuthorCard"; 

import {Modal} from 'react-responsive-modal';

// react.school/material-ui

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500]
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));


export default function Header(props){
  const classes = useStyles();
  const [example, setExample] = useState("primary");
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  const [open, openModal] = React.useState(false);
  const [openUser, openUserModel] = React.useState(false);
  const [openRating, openRatingModal] = React.useState(false);
  const [openGenre, openGenreModal] = React.useState(false);

  const toggleUserModel = () => { 
    openUserModel(!openUser)

  }


  const toggleModal = () => {
    openModal(!open)
  }

  const toggleRatingModal = () => {
    openRatingModal(!openRating)
  }
 
  const toggleGenreModal = () => {
    openGenreModal(!openGenre)
  }
 
  const [DFMade, setDFMade] = useState(false);
  const [dfResults, setDfResults] = useState([]);
  useEffect( () => {
    let url = "http://localhost:3002/dramaFiction" 
    console.log("fml")
    Axios.get(url).then((response) => {
      setDfResults(response.data);
    })
  }, [DFMade]);

  const [AuthMade, setAuthMade] = useState(false);
  const [AuthResults, setAuthResults] = useState([]);
  useEffect( () => {
    let url = "http://localhost:3002/authorRatings" 
    console.log("fml")
    Axios.get(url).then((response) => {
      setAuthResults(response.data);
    })
  }, [AuthMade]);
    

  return (
    <React.Fragment>
      <AppBar
        color={isCustomColor || isCustomHeight ? "primary" : example}
        className={`${isCustomColor && classes.customColor} ${
          isCustomHeight && classes.customHeight
        }`}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Books4U
          </Typography>
          <IconButton color="inherit" onClick={toggleModal}>
            Register
            <Dialog open={open} handleClose={toggleModal}>
              <DialogTitle>Register</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To register, please enter a email, username, and password.
                </DialogContentText>
                <TextField
                  margin='dense'
                  id='name'
                  label='Email Address'
                  type='email'
                  variant='standard'
                  />
                <TextField
                  margin='dense'
                  id='username'
                  label='username'
                  type='text'
                  variant='standard'
                  />
                  <TextField
                  margin='dense'
                  id='password'
                  label='password'
                  type='password'
                  variant='standard'
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleModal}>Cancel</Button>
                {/* this needs to be changed to actually register an account */}
                <Button onClick={toggleModal}>Register</Button>
              </DialogActions>
            </Dialog>
          </IconButton>

          <IconButton color="inherit" onClick={toggleUserModel}>
            Log In
            <Dialog open={openUser} onClose={toggleUserModel}>
              <DialogTitle>Log in</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To login, please enter your email and your password.
                </DialogContentText>
                <TextField
                  margin='dense'
                  id='name'
                  label='Email Address'
                  type='email'
                  variant='standard'
                  />
                  <TextField
                  margin='dense'
                  id='password'
                  label='password'
                  type='password'
                  variant='standard'
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleUserModel}>Cancel</Button>
                {/* this needs to be changed to actually register an account */}
                <Button onClick={toggleUserModel}>Register</Button>
              </DialogActions>
            </Dialog>
          </IconButton>

          <IconButton color="inherit" onClick={toggleRatingModal}>
            Average Rating
            <Dialog open={openRating} onClose={toggleRatingModal}>
              <DialogTitle>Average Author Rating</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Average Author Rating
                  {AuthResults.map((val) => {
                    return(
                    <div className='card'>
                    <AuthorCard Title={val.title} Rating={val.rating}/>
                    </div>)
                  })}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleRatingModal}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </IconButton>

          <IconButton color="inherit" onClick={toggleGenreModal}>
            Drama or Fiction
            <Dialog open={openGenre} onClose={toggleGenreModal}>
              <DialogTitle>Drama or Fiction</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Books that are Drama or Fiction
                  {dfResults.map((val) => {
                    return(
                    <div className='card'>
                    <BookCard Title={val.title} Author={val.authorName}/>
                    </div>)
                  })}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleGenreModal}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}; 