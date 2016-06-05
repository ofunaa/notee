class CreateNoteePosts < ActiveRecord::Migration
  def change
    create_table :notee_posts do |t|
      t.string :title
      t.text :content
      t.string :slug
      t.integer :status
      t.integer :category_id
      t.integer :thumbnail_id
      t.datetime :published_at
      t.string :seo_keyword
      t.string :seo_description

      t.timestamps null: false
    end
  end
end
