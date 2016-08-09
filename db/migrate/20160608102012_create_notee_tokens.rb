class CreateNoteeTokens < ActiveRecord::Migration
  def change
    create_table :notee_tokens do |t|
      t.string :access_token,    null: false
      t.integer :user_id
      t.datetime :expires_at,    null: false

      t.timestamps null: false
    end

    add_index :notee_tokens, [:access_token], :unique => true
  end
end
