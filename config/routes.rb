Rails.application.routes.draw do
  root 'homepage#index'

  #Add Waypoint route
  post 'api/v1/gps', to: 'waypoints#add'
  get 'show', to: 'waypoints#show'
end
