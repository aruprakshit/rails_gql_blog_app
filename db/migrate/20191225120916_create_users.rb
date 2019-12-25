class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :username
      t.string :email
      t.string :gender
      t.date :dob

      t.timestamps
    end
  end
end
