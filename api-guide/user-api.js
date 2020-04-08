/**
 * USER REGISTRATION
 * Route /api/users/register
 * TYPE POST
 * Headers { content-type: application/json }
 * Req Payload -
    {
        "username": "xxxxxxxxxxxxx",
        "password": "xxxxxxxxxxxxx",
        "name": "Nxxxxxxx Mxxxxxxx",
        "email": "xxxxxxxxxxx@gmail.com"
    }
 * Response Payload -
    {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbmR5bWFuZHkxIiwiZW1haWwiOiJtYXVyeWFuYXJlbmRyYTExQGdtYWlsLmNvbSIsImlkIjoiNWU4YmNiY2I0OWMwNTE2M2NhYTljNDc0IiwiaWF0IjoxNTg2MjE5OTgwLCJleHAiOjE1ODYyMjcxODB9.nnZ7QPwW8PEmvhT0EwtdzBcz_r_yURQCBeIq0e0Sg4Y",
        "success": true
    }
 * Error Response Payload -
    {
        "message": "users validation failed: username: Username nandymandy1 has already been taken., email: Email mauryanarendra11@gmail.com has already been taken.",
        "success": false
    }
 */

/**
 * USER AUTHENTICATION
 * Route /api/users/auth
 * TYPE POST
 * Headers { content-type: application/json }
 * Req Payload -
    {
        "username": "xxxxxxxxxxxxx",
        "password": "xxxxxxxxxxxxx"
    }
 * Response Payload -
    {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbmR5bWFuZHkxIiwiZW1haWwiOiJtYXVyeWFuYXJlbmRyYTExQGdtYWlsLmNvbSIsImlkIjoiNWU4YmNiY2I0OWMwNTE2M2NhYTljNDc0IiwiaWF0IjoxNTg2MjE5OTgwLCJleHAiOjE1ODYyMjcxODB9.nnZ7QPwW8PEmvhT0EwtdzBcz_r_yURQCBeIq0e0Sg4Y",
        "success": true
    }
 * Username Error Response Payload -
    {
        "message": "Username not found",
        "success": false
    }
 * Password Error Response Payload -
    {
        "message": "Incorrect password",
        "success": false
    }
 */

/**
 * AUTHENTICATED USER PROFILE
 * Route /api/users/auth
 * TYPE GET
 * Headers { 
        content-type: application/json, 
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbmR5bWFuZHkxIiwiZW1haWwiOiJtYXVyeWFuYXJlbmRyYTExQGdtYWlsLmNvbSIsImlkIjoiNWU4YmNiY2I0OWMwNTE2M2NhYTljNDc0IiwiaWF0IjoxNTg2MjE5OTgwLCJleHAiOjE1ODYyMjcxODB9.nnZ7QPwW8PEmvhT0EwtdzBcz_r_yURQCBeIq0e0Sg4Y
    }

 * Response Payload -
    {
        "email": "xxxxxxxxxxxx@gmail.com",
        "username": "xxxxxxxxxxxx",
        "name": "Xxxxxxxxxxx Xxxxxxxxx",
        "aadhar": xxxxxxxxxxxxxxx,
        "phone": xxxxxxxxxxxxxx,
        "orgName": "something"
    }
 * Auth Token Error Response Payload -
    Unauthorized
 */
