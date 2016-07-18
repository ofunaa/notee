class CreateNoteeImages < ActiveRecord::Migration
  class NoteeImage < ActiveRecord::Base; end

  def change
    create_table :notee_images do |t|

      t.string :content, null: false, uniqueness: true

      # if you have user_id
      # t.integer :user_id

      t.timestamps null: false
    end

    # create default image
    default_image = Notee::Image.create :content => 'aa'
    default_image.update_column("content", "default.png")
  end

end
