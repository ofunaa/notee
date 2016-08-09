class CreateNoteeUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :notee_users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.text :profile
      t.string :profile_img
      t.text :sns
      t.integer :role, null: false

      t.timestamps
    end
  end

  add_index :notee_users, [:name], :unique => true
  add_index :notee_users, [:email], :unique => true
end
