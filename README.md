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
- Vechicle (vehículos) 

|  | id | vechicle_identifier |
| :-------: | :-------: | :------: |
| Tipo | integer| integer | 
| Ejemplo | 1| H2-DFGH |






Things you may want to cover:n 
