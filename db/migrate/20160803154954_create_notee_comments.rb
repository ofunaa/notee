class CreateNoteeComments < ActiveRecord::Migration[5.0]
  def change
    create_table :notee_comments do |t|
      t.integer :post_id
      t.text :content
      t.string :name
      t.string :email
      t.boolean :is_hidden

      t.timestamps
    end
  end
end
