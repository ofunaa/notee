class CreateNoteeCategories < ActiveRecord::Migration
  class NoteeCategory < ActiveRecord::Base; end

  def change
    create_table :notee_categories do |t|

      t.string  :name, null: false, default: "category_name"
      t.string  :slug, null: false, uniqueness: true
      t.integer :parent_id
      t.integer :status, null: false, default: 0

      t.timestamps null: false
    end

    add_index :notee_categories, [:slug], :unique => true

    # create default category
    Notee::Category.create :name => 'None'
  end
end
