class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.datetime :time_from
      t.datetime :time_to
      t.integer :num
      t.integer :user_id
      t.integer :restaurant_id

      t.timestamps null: false
    end
    add_foreign_key :reservations, :users
    add_foreign_key :reservations, :restaurants
  end
end
