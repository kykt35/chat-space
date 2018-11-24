class Group < ApplicationRecord
  has_many :users, through: :group_user
  has_many :messages
  has_many :group_user
  validates :name, presence: true
end
