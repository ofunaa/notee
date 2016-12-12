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

    # create root User
    Notee::User.skip_callback(:create, :before, :create_authority)
    Notee::User.create(id: 0, name: Notee.notee_id, email: "root", password: SecureRandom.hex, role: 9999)
    Notee::User.set_callback(:create, :before, :create_authority)

    add_index :notee_users, [:name, :email], :unique => true
  end
end
