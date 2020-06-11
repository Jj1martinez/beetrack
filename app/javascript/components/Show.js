import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MyImage from 'images/beetrackimg.png'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(0deg, #05204A 85%, yellow 100%)',
    backgroundSize: "cover",
    height: "100%",
    fontFamily: [
    
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  form: {
    '& > *': {
      margin: 10,
      width: '25ch',
    },
  },
  container:{
    padding:"10%",
    paddingTop: 50,
    paddingBottom:70,
    textAlign:"center",
  },
  content:{
    backgroundColor: "#E1E2EF",
    padding:10,
    borderRadius: 5,
  },
  grid:{
    height: '100%',
    paddingTop: 25,
  },
  leafletContainer :{
    height: "65vh",
    minWidth:"100%",
    padding:"150px"
  },
  mapContainer:{
    width:"100%",
    minWidth:"100%",
    padding:"10px"
  },
  img:{
    margin: "auto",
    height: 100,
    width: 100
  }

});




const Show = () => {
  const actualDate = ()=>{
    var date = new Date();
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      ("00" + date.getDate()).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    return dateStr
  }
    const [carsWaypoints, setCarsWaypoints] = useState([]);
    const classes = useStyles();
    const [dateStr,setDateStr] = useState(actualDate())
    var latitudeDefault = -33.44
    var longitudeDefault =  -70.67
    
    const getWaypoints = () => {
      axios.get('/show')
      .then(res => {
        console.log(res)
        setCarsWaypoints(res.data)
      })
    }

    const postWaypoint = ()=>{
      axios.post('/api/v1/gps',data)
      .then(res => {
        console.log(res)
      })
    }

    const dataDefault = {
      latitude: latitudeDefault,
      longitude: longitudeDefault,
      vehicle_identifier: "",
      send_at: dateStr
    }
    const [data, setData] = useState(dataDefault);

    const handleSubmit = ()=>{
     console.log(data)
     postWaypoint()
     getWaypoints()
     const actual= actualDate()
     setDateStr(actual)
    }
    const handleChange = (event) =>{
      event.persist()
      data[event.target.name] = event.target.value
      setData(data)
    }

    useEffect(()=>{
      getWaypoints()
    },[])

    return (
    <div className= {classes.root}>
      <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
      <div className={classes.container}>
        <div className={classes.content}>
        <h1>Latest waypoints</h1>
        <Grid className={classes.grid}
        container
        >

        <Grid
          item
          lg={8}
          sm={12}
        >
         
          <h2>Live Map</h2>
          {/* <button onClick={getWaypoints}>Refresh</button> */}
          <div className={classes.mapContainer} >
            <Map className={classes.leafletContainer} center={[latitudeDefault,longitudeDefault]} zoom={11}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {carsWaypoints.map(car => (
              <Marker
                key={car[0].vehicle_identifier}
                position={[
                  car[1].latitude,
                  car[1].longitude
                ]}
                onClick={() => {
                  console.log(car[0].vehicle_identifier)
                }}
              />
            ))}
            </Map>
         </div>
        </Grid>
        <Grid
          
          item
          lg={4}
          sm={12}
        >
         <h2>Add waypoint</h2>
         <form className={classes.form}  noValidate autoComplete="off">
          <TextField name="latitude" label="Latitude" onChange={handleChange} 
          variant="outlined"   defaultValue={latitudeDefault}  />
          <TextField name="longitude" label="Longitude" onChange={handleChange}
          variant="outlined"   defaultValue={longitudeDefault}  />
          <TextField name="vehicle_identifier" label="Vechile Id"  onChange={handleChange}
          variant="outlined"  />
          <TextField name="send_at" label="Date" onChange={handleChange}
          variant="outlined"  defaultValue={dateStr}  />
          <Button variant="contained" onClick={()=> {handleSubmit()}} color="primary">Send</Button>
        </form>
        <img className={classes.img} src={MyImage} />
        </Grid>

        </Grid>
        </div>
      </div>
    </div>
    )
}

export default Show
