json.array! @new_messages do |message|
  json.id           message.id
  json.user_name    message.user.name
  json.content      message.content
  json.created_at   message.strp_created_at
  json.image_url    message.image.url
  json.image_alt    message.image.alt
end

