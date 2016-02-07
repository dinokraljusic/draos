class AddTypeToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :description, :string
    add_column :restaurants, :type, :string
    add_column :restaurants, :link, :string
    add_column :restaurants, :work_hours_from, :time
    add_column :restaurants, :work_hours_to, :time
  end
end
