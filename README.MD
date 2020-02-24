### Task
```
   https://drive.google.com/drive/folders/1yQd6eFhnbPAmuuFqaMJYszNBMXwpNtfx?usp=sharing
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
   curl --location --request DELETE 'localhost:3000/v1/users' \
   --header 'Content-Type: application/json' \
   --data-raw '{
      "id": "5e502541bb617386c48f6a8c"
   }'
```