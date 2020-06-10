class WaypointsController < ApplicationController
    protect_from_forgery with: :null_session 
    skip_before_action :verify_authenticity_token

    def add
        begin
            if (!params[:longitude] || !params[:latitude] ||
                 !params[:vehicle_identifier] || !params[:send_at])
                return render json: "Missing parameters", status: :bad_request
            end
            vehicle = Vehicle.find_by(vehicle_identifier: params[:vehicle_identifier])
            if !vehicle
                Vehicle.create(vehicle_identifier: params[:vehicle_identifier])
            end
            waypoint = Waypoint.create(latitude: params[:latitude],
            longitude: params[:longitude], vehicle_identifier: params[:vehicle_identifier],
            send_at: params[:send_at])
            render json:  waypoint , status: :created
        rescue Exception => error
            return render json: "Missing parameters", status: :bad_request
        end
    end

    def show
        begin
            @vehicles = Vehicle.all
            @waypoint_vehicles=[]
            @vehicles.each do |vehicle|
                last_waypoint = Waypoint.where(
                    vehicle_identifier: vehicle.vehicle_identifier).order(
                        "send_at DESC").first
                @waypoint_vehicles.push([vehicle,last_waypoint])
            end
            render json: @waypoint_vehicles, status: :ok
        rescue Exception => error
            render json: error, status: :bad_request
        end
    end

    private
end