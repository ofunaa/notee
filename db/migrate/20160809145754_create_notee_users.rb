class CreateNoteeUsers < ActiveRecord::Migration
  def change
    create_table :notee_users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.text :profile
      t.string :profile_img
      t.integer :role, null: false
      t.boolean :is_deleted, null: false, default: false

      t.timestamps null: false
    end

    add_index :notee_users, [:name, :email], :unique => true
  end
end
