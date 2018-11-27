class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content,presence: true, unless: :image?
  mount_uploader :image, ImagesUploader

  #作成日の表示形式を整形
  def strp_created_at
    created_at.in_time_zone('Asia/Tokyo').strftime('%Y/%m/%d %H:%M:%S')
  end
end
