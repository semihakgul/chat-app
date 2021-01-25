# chat-app
*chat-app* has two services, *user-service* and *chat-service*, built as two separate projects. 

## user-service 
## End-points

End-points | Descriptions | Body | Authorization Required
--- | --- | --- | ---
'/auth/register' | register a new user | {"userName":String, "password":String} | false
'/auth/login'| user login | {"userName":String, "password":String} | false
'/user/id/:userId' | retrieve a user by their id | - | true
'/user/block/:blockedUserId' | (un)block a user by their id | {"blockValue":boolean} | true
'/user/name/:userName' | retrieve a user by their name | - | true

