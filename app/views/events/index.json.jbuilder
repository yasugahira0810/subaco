json.array!(@events) do |event|
  json.extract! event, :id, :title, :start, :end, :allDay, :user_name
  json.url event_url(event, format: :json)
end
