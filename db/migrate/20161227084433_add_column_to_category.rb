class AddColumnToCategory < ActiveRecord::Migration[5.0]
  def change
    add_column :notee_categories, :priority, :integer
  end
end
