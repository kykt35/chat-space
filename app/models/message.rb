class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content,presence: true, unless: :image?
  mount_uploader :image, ImagesUploader

  def strp_created_at
    self.created_at.in_time_zone('Asia/Tokyo').strftime('%Y/%m/%d %H:%M:%S')
  end
end
