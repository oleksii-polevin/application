### Task_1
```
npm run emails
```
### Task_2
```
- create dropbox app on official site
- generate access token
- paste token into variable token in lesson_4/screenshots.js

npm run screenshots
```

### Find User
```
   curl --location --request GET 'localhost:3000/v1/users'
```

### Create User
```
   curl --location --request POST 'localhost:3000/v1/users' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "email": "test@gmail.com",
      "fullName": "Wow Yay"
   }'
```

### Update User
```
   curl --location --request PUT 'localhost:3000/v1/users' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "id": "5e53ecab28d5310d528f9fe9",
      "fullName": "Yay Foo"
   }'
```

### Delete User
```
   curl --location --request GET 'localhost:3000/v1/users' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "id": "5e5546fa1c985b25985cefc5"
   }'
```