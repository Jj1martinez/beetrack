# Beetack API Juan José Martínez

Sobre la Api 
------------------
Esta API se creó con el motivo de demostrar los conocimientos necesarios sobre Ruby on Rails para la empresa Beetrack. Esta api permite visualizar las últimas posiciones sobre vehículos registrados en esta. Por otro lado, tambien posee una ruta por parte de la API rest en donde se pueden actualizar la última posición para cada vehículo. 

Arquitectura
------------
Para la realización de esta API se diseño una aplicación monolítica la cual posee un backend con framework Ruby on Rails versión 6.03 y dentro del Framewotk se incorporó para el Frontend la gema React-rails para generar vistas con componentes React. React fue incorporado para manejar sencillamente los estados de las vistas y también para acelerar el las requests al backend. 

Base de datos
--
Para ambos ambiente se trabajó on bases de datos relacionales.En el ambiente de producción se trabajó con sqlite3, que viene por defecto. Para el ambiente producción se utilizó Postgres ya que heroku no soporta la utilización de sqlite3. 

Modelo de Datos
----
El modelo de datos se compone de 2 Entidades y 1 relación. 
- Vechicle (vehículos)  (1:N con Waypoints)

|  | id | vechicle_identifier |
| :-------: | :-------: | :------: |
| Tipo | integer| integer | 
| Ejemplo | 1| H2-DFGH |

- Waypoint (Punto de localización)

|  | id | latitude | longitude | vechicle_identifier| send_at |
| :-------: | :-------: | :------: | :-----: | :-------: | :------: |
| Tipo | float| float | string | string | string| 
| Ejemplo | 1 |45.32| 32.32 | H2-DFGH | 06/11/2020 19:19:11 |

API UI
------
Esta Api se compone de una sola ruta para visualizar los últimos waypoints de cada vechículo. También es posible agregar el waypoint deseado desde ahí con el formulario que se ofrece. De no querer agregarlo por ahí se puede hacer mediante la ruta de la API rest. 
Al agregar un nuevo Waypoint el mapa se actualiza en tiempo real. Al hacer click en los waypoints podremos saber cual es la posición de esa marka y cúal vehículo es el seleccionado. 
Para la visualización del mapa se utilizó la libreria Leaflet debido a su facil implementación y gratuidad. 

Dirección UI 
``` 
/show
``` 

API REST Endpoints
---
Estas rutas al ser preguntadas o recibir un request devuelven una respuesta en formato Json.

- Agregar waypoint a la base de datos. 

Endpoint

``` 
/api/v1/gps
``` 
Example Request

``` 
POST /api/v1/gps
content-type: application/json

{
    "latitude": 51.06,
    "longitude": -0.09,
    "vehicle_identifier": "H2-23FT",
    "send_at": "2019-06-8 23:49:00"
}
``` 

Example Response

``` 
HTTP/1.1 200 OK  
Content-Type: application/json

{
  "id": 64,
  "latitude": 51.06,
  "longitude": -0.09,
  "vehicle_identifier": "H2-23FT",
  "send_at": "2019-06-08T23:49:00.000Z",
  "created_at": "2020-06-11T23:27:50.773Z",
  "updated_at": "2020-06-11T23:27:50.773Z"
}
```

- Obtener lista de todos los vehículos junto a sus últimos Waypoint

Endpoint

``` 
/get_waypoints
``` 
Example Request

``` 
GET /get_waypoints
``` 

Example Response

``` 
HTTP/1.1 200 OK  
Content-Type: application/json

[
    {
      "id": 1,
      "vehicle_identifier": "H3-23FT",
      "created_at": "2020-06-10T16:40:12.795Z",
      "updated_at": "2020-06-10T16:40:12.795Z"
    },
    {
      "id": 2,
      "latitude": 75.392,
      "longitude": 75.123,
      "vehicle_identifier": "H3-23FT",
      "send_at": "2019-06-08T23:50:00.000Z",
      "created_at": "2020-06-10T16:40:23.627Z",
      "updated_at": "2020-06-10T16:40:23.627Z"
    }
  ]
}
```

USO
----

La api se encuentra en la url https://beetrack-api.herokuapp.com/ para su rapido uso y revisión. De querer correrlo en local se debe tener instalado rails 6.03 y la versión ruby 2.7. Luego se debe ejecutar la instalación de los módulos de node.js de la aplicación. Finalmente se debe crear la base de datos y correr las migraciones. De esta manera podemos ejecutar el comando de inicio para encontrarnos con nuestra aplciación en http://localhost:3000/show y nuestro mapa. 

Detalle Backend
----

Se utilizaron dos controladores. Homepage para renderiar los componentes de React y Waypoint para hacer los calculos logicos y la interacción con la base de datos. 




Things you may want to cover:n 
