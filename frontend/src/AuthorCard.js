import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'

/***
 * @IMPORTANT
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
	let Rating = props.Rating;
    let Author = props.Author;

  

  //if no data is returned we shouldn't display anything
   return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
			Auhtor: {Author}
        </Typography>
        <Typography variant="body2">
			Rating: {Rating}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
