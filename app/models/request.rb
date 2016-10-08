class Request < ApplicationRecord
  enum status: [ :pending, :active, :rejected, :finished, :canceled ]

  belongs_to :user
  belongs_to :driver, class_name: :User

  def as_json (options = {})
    super(options.merge(except: :password_digest, include: [:user, :driver]))
  end
end
