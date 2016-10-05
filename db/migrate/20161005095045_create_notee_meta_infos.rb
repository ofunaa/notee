class CreateNoteeMetaInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :notee_meta_infos do |t|

      t.timestamps
    end
  end
end
