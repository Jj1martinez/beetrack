Rails.application.routes.draw do
  root 'homepage#index'

  #Add Waypoint route
  post 'api/v1/gps', to: 'waypoints#add'
end
