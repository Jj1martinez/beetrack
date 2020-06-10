class CreateWaypoints < ActiveRecord::Migration[6.0]
  def change
    create_table :waypoints do |t|
      t.float :latitude
      t.float :longitude
      t.string :vehicle_identifier
      t.datetime :send_at

      t.timestamps
    end
  end
end
