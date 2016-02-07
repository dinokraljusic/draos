class ChangeColumnType < ActiveRecord::Migration
  def change
    remove_column :restaurants, :type, :string
    add_column :restaurants, :tip, :string
  end
end
