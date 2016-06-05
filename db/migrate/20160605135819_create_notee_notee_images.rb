class CreateNoteeNoteeImages < ActiveRecord::Migration
  def change
    create_table :notee_notee_images do |t|
      t.string :content

      t.timestamps null: false
    end
  end
end
