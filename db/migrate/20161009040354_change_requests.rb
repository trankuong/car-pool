class ChangeRequests < ActiveRecord::Migration[5.0]
  def change
    add_column :requests, :x_i, :float
    add_column :requests, :y_i, :float
    add_column :requests, :x_f, :float
    add_column :requests, :y_f, :float
    remove_column :requests, :start, :json
    remove_column :requests, :end, :json
  end
end
