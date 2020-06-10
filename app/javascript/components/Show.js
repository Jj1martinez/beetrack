import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(0deg, blue 40%, yellow 90%)',
    backgroundSize: "cover",
    height: "100%"
  },
  container:{
    padding:150,
    paddingBottom:500,
    textAlign:"center",
  },
  content:{
    backgroundColor: "#D2D7DF",
    padding:10,
    borderRadius: 5,
  },
  grid:{
    height: '100%',
    paddingTop: 25,
  }
});


const Show = () => {
    const [carsWaypoints, setCarsWaypoints] = useState([]);
    const classes = useStyles();


    useEffect(()=>{
      axios.get('/show')
      .then(res => {
        console.log(res)
        setCarsWaypoints(res.data)
      })
    },[])

    return (
    <div className= {classes.root}>
      <div className={classes.container}>
        <div className={classes.content}>
        <h1>Latest Routes</h1>
        <Grid className={classes.grid}
        container
        >
        <Grid
          item
          lg={8}
        >
         Live map
        </Grid>
        <Grid
          
          item
          lg={4}
        >
          Generate new Waypoint
        </Grid>

        </Grid>
        </div>
      </div>
    </div>
    )
}

export default Show
