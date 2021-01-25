# chat-app
*chat-app* has two services, *user-service* and *chat-service*, built as two separate projects. 

## user-service 
### End-points

End-points | End-points | Descriptions | Body | Authorization Required
--- | --- | --- | --- | ---
post |'/auth/register' | register a new user | {"userName":String, "password":String} | false
post |'/auth/login'| user login | {"userName":String, "password":String} | false
get |'/user/id/:userId' | retrieve a user by their id | - | true
get |'/user/name/:userName' | retrieve a user by their name | - | true
post |'/user/block/:blockedUserId' | (un)block a user by their id | {"blockValue":boolean} | true

## chat-service 
### End-points

End-points | End-points | Descriptions | Body | Authorization Required
--- | --- | --- | --- | ---
post |'/chat/create' | start a chat with a user | {"chatFriendName":String} | true
post |'/chat/:roomId?limit=3'| get chat messages | {"userName":String, "password":String} | true
get |'/chat/:roomId/message' | send a message to a room | {"messageText":String} | true
delete |'/chat/:roomId' | delete a chat |  | true

