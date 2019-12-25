class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :rateable, polymorphic: true, null: false, type: :uuid
      t.integer    :weight
      t.string     :category

      t.timestamps
    end
  end
end
