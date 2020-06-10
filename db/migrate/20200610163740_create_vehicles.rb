class CreateVehicles < ActiveRecord::Migration[6.0]
  def change
    create_table :vehicles do |t|
      t.string :vehicle_identifier

      t.timestamps
    end
  end
end
