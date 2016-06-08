class CreateNoteePosts < ActiveRecord::Migration
  def change
    create_table :notee_posts do |t|

      # notee's base

      t.string  :title,    null: false, default: "no title"
      t.text    :content,  null: false, default: ""
      t.string  :slug,     null: false, default: "#{Time.now.strftime("%Y-%H-%M-%S")}"
      t.integer :status,   null: false, default: 0
      t.integer :category_id,  null: false, default: ""
      t.integer :thumbnail_id,  null: false, default: ""
      t.datetime :published_at, null: false

      # seo
      t.string  :seo_keyword, null: false, default: ""
      t.string  :seo_description, null: false, default: ""


      # if you have user_id
      # t.integer :user_id

      t.timestamps null: false

    end
  end
end
