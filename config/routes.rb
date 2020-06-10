Rails.application.routes.draw do
  # root 'static#index'

  #Add Waypoint route
  post 'api/v1/gps', to: 'waypoints#add'
  get 'show', to: 'waypoints#show'
end
