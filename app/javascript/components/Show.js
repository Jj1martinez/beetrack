import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MyImage from 'images/beetrackimg.png'


// 1. Aqui deifnimos ell comportamiento visual de nuestro display
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(to top, #f4b423, #f47e40, #d8515b, #662f69, #482b62, #2a2658, #05204a, #05204a, #05204a, #05204a)',
    backgroundSize: "cover",
    height: "100%",
    fontFamily: [
      'Montserrat', "sans-serif"
    ].join(','),
    h1:{
      fontFamily:['Noto Sans TC' ,'sans-serif'].join(',')
    }
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



// 2. Iniciamos el componente a utilizar
const Show = () => {
  // 2.1 Setiamos el date para facilitar al usuario en el UI
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
  // 2.2 Definimos el estado y las propiedades por default de nuestra aplicacion
  const [carsWaypoints, setCarsWaypoints] = useState([]);
  const classes = useStyles();
  const [dateStr,setDateStr] = useState(actualDate())
  var latitudeDefault = -33.44
  var longitudeDefault =  -70.67

  // 2.3 Metodo para recolectar los waypoints actuales
  const getWaypoints = () => {
    axios.get('/get_waypoints')
    .then(res => {
      setCarsWaypoints(res.data)
    })
  }
  // 2.4 Metodo para añadir los métodos actuales
  const postWaypoint = ()=>{
    axios.post('/api/v1/gps',data)
  }
  // 2.5 definimos nuestro data default para iniciar el estado del form
  const dataDefault = {
    latitude: latitudeDefault,
    longitude: longitudeDefault,
    vehicle_identifier: "",
    send_at: dateStr
  }
  const [data, setData] = useState(dataDefault);
  // 2.6  Método para recolectar la infromación del form y hacer el post a la API
  const handleSubmit = ()=>{
    console.log(data)
    postWaypoint()
    getWaypoints()
    const actual= actualDate()
    setDateStr(actual)
  }
  //2.7 Método para actualziar las variables del form
  const handleChange = (event) =>{
    event.persist()
    data[event.target.name] = event.target.value
    setData(data)
  }
  // 2.8 Primer display de los datos
  useEffect(()=>{
    getWaypoints()
  },[])
  // 2.9 Retornamos el componente para el display 
  return (
    <div className= {classes.root}>
      {/* Importamos css de Leaflet */}
          <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""
    />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;1,400&display=swap" rel="stylesheet"></link>
      <div className={classes.container}>
        <div className={classes.content}>
        <h1 className={classes.root.h1}>Waypoints</h1>
        <Grid className={classes.grid}
        container
        >

        <Grid
          item
          lg={8}
          sm={12}
        >
         
          <h3>Live map</h3>
          <div className={classes.mapContainer} >
            {/* Se integra el mapa de Leaflet */}
            <Map className={classes.leafletContainer} center={[latitudeDefault,longitudeDefault]} zoom={11}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {carsWaypoints.map(car => (
              (car[1].latitude && car[1].longitude) && 
              <Marker
                key={car[0].vehicle_identifier}
                position={[
                  car[1].latitude,
                  car[1].longitude
                ]}

              > 
              <Popup>
                <p>Vehicle ID: {car[0].vehicle_identifier}</p>
                <p>Latitude: {car[1].latitude}</p>
                <p>Longitude: { car[1].longitude}</p>
                      
              </Popup></Marker>

            ))}
            </Map>
         </div>
        </Grid>
        <Grid
          
          item
          lg={4}
          sm={12}
        >
         <h3>Add</h3>
         {/* Se despliega el form para obtener los datos  */}
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
