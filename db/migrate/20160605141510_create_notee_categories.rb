class CreateNoteeCategories < ActiveRecord::Migration
  def change
    create_table :notee_categories do |t|
      t.string :name
      t.string :slug
      t.integer :parent_id
      t.integer :status

      t.timestamps null: false
    end
  end
end
