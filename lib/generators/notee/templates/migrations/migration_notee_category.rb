class CreateNoteeCategory < ActiveRecord::Migration
  def change
    create_table :notee_category do |t|

      t.string  :name, null: false, default: "category_name"
      t.string  :slug, null: false, default: "#{Time.now.strftime("%Y-%H-%M-%S")}", uniqueness: true
      t.integer :parent_id
      t.integer :status, null: false, default: 0

      t.timestamps null: false
    end

  end
end
