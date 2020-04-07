/**
 * AUTHENTICATED USER'S JOBS
 * Route /api/jobs
 * TYPE GET
 * Headers { 
        content-type: application/json, 
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbmR5bWFuZHkxIiwiZW1haWwiOiJtYXVyeWFuYXJlbmRyYTExQGdtYWlsLmNvbSIsImlkIjoiNWU4YmNiY2I0OWMwNTE2M2NhYTljNDc0IiwiaWF0IjoxNTg2MjE5OTgwLCJleHAiOjE1ODYyMjcxODB9.nnZ7QPwW8PEmvhT0EwtdzBcz_r_yURQCBeIq0e0Sg4Y
    }

 * Response Payload -
    {
        "jobs": [
            {
                "_id": "5e8bc9602d478c62e171b3ae",
                "name": "something",
                "phone": 1234567890,
                "standard": "1234567",
                "school": "Lucknow Public College",
                "area": "NiralaNagar, Lucknow",
                "jobId": "XJ 34777",
                "user": "5e8bc3ae539fc96138983820",
                "date": "2020-04-07T00:29:20.950Z",
                "__v": 0
            },
            {
                "_id": "5e8bc9954826ff62f0488301",
                "name": "something1",
                "phone": 1234567890,
                "standard": "12345671",
                "school": "Lucknow Public College 1",
                "area": "NiralaNagar, Lucknow, UP",
                "jobId": "XJ 72144",
                "user": "5e8bc3ae539fc96138983820",
                "date": "2020-04-07T00:30:13.199Z",
                "__v": 0
            }
        ],
        "paginator": {
            "jobCount": 2,
            "perPage": 5,
            "pageCount": 1,
            "currentPage": 1,
            "slNo": 1,
            "hasPrevPage": false,
            "hasNextPage": false,
            "prev": null,
            "next": null
        }
    }
 * Auth Token Error Response Payload -
    Unauthorized
 */

/**
 * AUTHENTICATED USER'S JOBS
 * Route /api/jobs
 * TYPE POST
 * Headers { 
        content-type: application/json, 
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hbmR5bWFuZHkxIiwiZW1haWwiOiJtYXVyeWFuYXJlbmRyYTExQGdtYWlsLmNvbSIsImlkIjoiNWU4YmNiY2I0OWMwNTE2M2NhYTljNDc0IiwiaWF0IjoxNTg2MjE5OTgwLCJleHAiOjE1ODYyMjcxODB9.nnZ7QPwW8PEmvhT0EwtdzBcz_r_yURQCBeIq0e0Sg4Y
    }
    
 * Request Payload -
    {
        "name": "something1",
        "phone": "1234567890",
        "standard": "12345671",
        "school": "Lucknow Public College 1",
        "area": "NiralaNagar, Lucknow, UP"
    }
 * Respone Payload -
    {
        "_id": "5e8bcecf38e7d26507d37ee4",
        "name": "something1",
        "phone": 1234567890,
        "standard": "12345671",
        "school": "Lucknow Public College 1",
        "area": "NiralaNagar, Lucknow, UP",
        "jobId": "XJ 22465",
        "user": "5e8bc3ae539fc96138983820",
        "date": "2020-04-07T00:52:31.699Z",
        "__v": 0
    }
 * Auth Token Error Response Payload -
    Unauthorized
 */
