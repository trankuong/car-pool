class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true

  has_many :requests
  has_many :driven, foreign_key: :driver_id, class_name: :Request

  def as_json (options = {})
    super(options.merge(except: :password_digest))
  end
end
