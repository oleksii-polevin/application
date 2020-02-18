### Validation
```
    https://hapi.dev/family/joi/
```

### Find User ### modified ###
```
    curl --location --request GET 'localhost:3000/v1/users/find?email=test@gmail.com' \
    --header 'Content-Type: application/json' \
```

### Create User
```
    curl --location --request POST 'localhost:3000/v1/users/create' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "fullName": "Test User"
    }'
```

### Update User ### modified ###
```
    curl --location --request PUT 'localhost:3000/v1/users/update' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "fullName": "Update User"
    }'
```

### Delete User
```
    curl --location --request DELETE 'localhost:3000/v1/users/delete' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com"
    }'
```
### Application modification
```
   - Mongoose model: added field fullName
   - Update User method: added field email which used as a key for updating user's full name
   - Find user method: used query params insted of --data-raw...
```