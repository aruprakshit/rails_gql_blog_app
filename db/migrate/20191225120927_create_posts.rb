class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts, id: :uuid do |t|
      t.text :body
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
