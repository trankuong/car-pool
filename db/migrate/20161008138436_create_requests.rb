class CreateRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :requests do |t|
      t.references :user, index: true, foreign_key: true
      t.json :start
      t.json :end
      t.integer :status
      t.references :driver, index: true

      t.timestamps
    end
    
    add_foreign_key :requests, :users, column: :driver_id
  end
end
