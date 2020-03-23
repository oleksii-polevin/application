

### Find User
```
   curl --location --request GET 'localhost:3000/v1/users/user' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTc4YjA0YmMxNDI0OTFmZjg0YjE4YjIiLCJpYXQiOjE1ODQ5Njc3NTUsImV4cCI6MTU4NDk3MTM1NX0.SkyIvNxnJlcSu_cquoUGaqbZS35tOMjdjnhOUSWVtXc'
```

### Create User
```
  curl --location --request POST 'localhost:3000/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "testjwt@gmail.com",
"fullName": "test jwt"
}'
```

### Update User
```
   curl --location --request POST 'localhost:3000/v1/users/update' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTc4YjA0YmMxNDI0OTFmZjg0YjE4YjIiLCJpYXQiOjE1ODQ5Njc3NTUsImV4cCI6MTU4NDk3MTM1NX0.SkyIvNxnJlcSu_cquoUGaqbZS35tOMjdjnhOUSWVtXc' \
--header 'Content-Type: application/json' \
--data-raw '{
	"fullName": "update test"
}'
```

### Delete User
```
   curl --location --request POST 'localhost:3000/v1/users/delete' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTc4Yjk0MWVhZTQwMjJjY2EzNDMyYTEiLCJpYXQiOjE1ODQ5NzAwNDksImV4cCI6MTU4NDk3MzY0OX0.cWM-JJl5pyrB4Ht_Y-WB-jJdsTPwjwHz9WM3g7o-tIg'
```

### Update tokens
```
curl --location --request GET 'localhost:3000/v1/jwt/token' \
--header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTc4YzUwYWVhMjNmZTNiMDBlNGEwZWUiLCJpYXQiOjE1ODQ5NzMxNDEsImV4cCI6MTU4NTU3Nzk0MX0.TlywXJ7P5RVLZC6inLVDF0CK65pCz6Rlv_GKE_O3QCg'
```

### Get new tokens after logout
```
curl --location --request POST 'localhost:3000/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "testjwt@gmail.com"
}'
```