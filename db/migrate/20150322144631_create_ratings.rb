class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :user_id
      t.integer :restaurant_id
      t.integer :rate

      t.timestamps null: false
    end

    add_foreign_key :ratings, :users
    add_foreign_key :ratings, :restaurants
  end
end
