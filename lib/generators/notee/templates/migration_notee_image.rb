class CreateNoteeImage < ActiveRecord::Migration
  def change
    create_table :notee_image do |t|

      t.string :content, null: false, uniqueness: true

      # if you have user_id
      # t.integer :user_id

      t.timestamps null: false
    end

  end
end
