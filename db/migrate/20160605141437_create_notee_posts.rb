# This migration comes from notee (originally 20160605141437)
class CreateNoteePosts < ActiveRecord::Migration
  def change
    create_table :notee_posts do |t|

      # notee's base

      t.string  :title, default: "no title"
      t.text    :content
      t.string  :slug
      t.integer :status, default: 0
      t.integer :category_id, default: 0
      t.integer :thumbnail_id, default: 0
      t.datetime :published_at

      # seo
      t.string  :seo_keyword, default: ""
      t.string  :seo_description, default: ""


      # if you have user_id
      # t.integer :user_id

      t.timestamps null: false

    end

    add_index :notee_posts, :slug, :unique => true
  end
end
