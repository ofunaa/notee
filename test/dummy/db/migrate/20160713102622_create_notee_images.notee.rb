# This migration comes from notee (originally 20160605141547)
class CreateNoteeImages < ActiveRecord::Migration
  def change
    create_table :notee_images do |t|

      t.string :content, null: false, uniqueness: true

      # if you have user_id
      # t.integer :user_id

      t.timestamps null: false
    end
  end

end
