Rails.application.routes.draw do
  # 1. Rutas para el lado del cliente

  root 'homepage#index'
  get 'show', to: 'homepage#show'

  # 2. Rutas para nuestra API
  # 2.1 Endpoint donde se hace el post
  post 'api/v1/gps', to: 'waypoints#add'
  # 2.2 Endpoint se consulta los Waypoints actuales
  get 'get_waypoints', to: 'waypoints#show'
end
