# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
  User.create!(
    username: FFaker::Internet.user_name,
    email:    FFaker::Internet.email,
    gender:   ['male', 'female'].sample,
    dob:      Date.today.prev_year([1, 4, 5, 2].sample)
  )
end

# User sample attributes
puts({
  username: FFaker::Internet.user_name,
  email:    FFaker::Internet.email,
  gender:   ['male', 'female'].sample.upcase,
}.to_json)
