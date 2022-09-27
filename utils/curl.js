curl -X POST 'https://api.twitch.tv/helix/eventsub/subscriptions' \
-H 'Authorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx' \
-H 'Client-Id: wbmytr93xzw8zbg0p1izqyzzc5mbiz' \
-H 'Content-Type: application/json' \
-d '{"type":"channel.follow","version":"1","condition":{"broadcaster_user_id":"1234"},"transport":{"method":"webhook","callback":"https://example.com/callback","secret":"s3cre77890ab"}}' 

