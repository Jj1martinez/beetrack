Rails.application.routes.draw do
  root 'homepage#index'
  get 'show', to: 'homepage#show'
  #Add Waypoint route
  post 'api/v1/gps', to: 'waypoints#add'
  get 'get_waypoints', to: 'waypoints#show'
end
