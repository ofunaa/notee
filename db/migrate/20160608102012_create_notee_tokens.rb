class CreateNoteeTokens < ActiveRecord::Migration
  def change
    create_table :notee_tokens do |t|
      t.string :api_key,    null: false
      t.datetime :expires_at,    null: false

      t.timestamps null: false
    end

    add_index :notee_tokens, [:api_key], :unique => true
  end
end
