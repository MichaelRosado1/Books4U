import React, { useState } from "react";
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



export default function ButtonAppBar() {
  const classes = useStyles();
  const [example, setExample] = useState("primary");
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  }

  const handleLoginClose = () => {
    setOpenLogin(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


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
          <IconButton color="inherit" onClick={handleClickOpen}>
            Register
            <Dialog open={open} onClose={handleClose}>
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
                <Button onClick={handleClose}>Cancel</Button>
                {/* this needs to be changed to actually register an account */}
                <Button onClick={handleClose}>Register</Button>
              </DialogActions>
            </Dialog>
          </IconButton>

          <IconButton color="inherit" onClick={handleOpenLogin}>
            Log In
            <Dialog open={openLogin} onClose={handleLoginClose}>
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
                <Button onClick={handleLoginClose}>Cancel</Button>
                {/* this needs to be changed to actually register an account */}
                <Button onClick={handleLoginClose}>Register</Button>
              </DialogActions>
            </Dialog>
          </IconButton>
          
          <IconButton color="inherit" onClick={() => setExample("secondary")}>
            My List
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      Have Search bar component
      <Search/>
    </React.Fragment>
  );
}
