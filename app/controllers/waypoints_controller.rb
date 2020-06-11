class WaypointsController < ApplicationController
    protect_from_forgery with: :null_session 
    skip_before_action :verify_authenticity_token
    # Método para ingresar el waypoint a nuestra BD
    def add
        begin
            # Si los parámetros son  vacios se retorna error Bad request
            if (!params[:longitude] || !params[:latitude] ||
                 !params[:vehicle_identifier] || !params[:send_at])
                return render json: "Missing parameters", status: :bad_request
            end
            # Si el vehiculo no existe se crea
            vehicle = Vehicle.find_by(vehicle_identifier: params[:vehicle_identifier])
            if !vehicle
                Vehicle.create(vehicle_identifier: params[:vehicle_identifier])
            end
            # Luego ya con el objeto vehicul ocreado se procede a generar el Waypoint
            waypoint = Waypoint.create(latitude: params[:latitude],
            longitude: params[:longitude], vehicle_identifier: params[:vehicle_identifier],
            send_at: params[:send_at])
            # Finalmente se renderea el json con el waypoin y un status 201. 
            render json:  waypoint , status: :created
        rescue Exception => error
            # si existe un error se debe a parametros invalidos
            return render json: "Missing parameters", status: :bad_request
        end
    end

    #Metodo para obtener los waypoints actuales
    def show
        begin
            #Recolectamos todos los vehiculos
            @vehicles = Vehicle.all
            #Luego los ingresamos de la forma [vechiculo,lastWaypoint]
            @waypoint_vehicles=[]
            @vehicles.each do |vehicle|
                #Calculamos cual fue el ultimo Waypoint
                last_waypoint = Waypoint.where(
                    vehicle_identifier: vehicle.vehicle_identifier).order(
                        "send_at DESC").first
                @waypoint_vehicles.push([vehicle,last_waypoint])
            end
            #Generamos un render con la lista que necesitamos
            render json: @waypoint_vehicles, status: :ok
        rescue Exception => error
            #Si existe error es porque se ingresaron mas parametros que puedan afectar a la ruta
            render json: error, status: :bad_request
        end
    end

    private
end