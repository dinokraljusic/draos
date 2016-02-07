class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :menu
      t.float :lon
      t.float :lat

      t.timestamps null: false
    end
  end
end
