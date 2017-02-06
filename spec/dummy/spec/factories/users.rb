FactoryGirl.define do
  factory :user, class: Notee::User do
    sequence(:name) { |i| "user#{i}" }
    sequence(:email) { |i| "email#{i}@gmail.com" }
    password SecureRandom.hex
    role 0
  end
end
