
# Crud API

Install dependencies

```bash
npm i
```

# Scripts

Development start server

```bash
npm run start:dev
```

Build and start server

```bash
npm run start:prod
```

Start Horizontal scaling

```bash
npm run start:multi
```

Testing response from server

```bash
npm run test
```

# Routes

Start server on 3000 port

## GET

Get all users

```bash
/api/users
```

Get user by id

```bash
/api/users/{userId}
```

## POST

Add new user

```bash
/api/users
```

body:

```bash
{
    "username": 'John Doe',
    "age": '25',
    "hobbies": ['bike', 'swimming']
}
```

## PUT

Update user by id

```bash
/api/users/{userId}
```

body:
```bash
{
    "username": 'John Doe',
    "age": '26',
    "hobbies": ['bike', 'swimming'] 
}
```

## DELETE

Delete user by id

```bash
api/users/{userId}
```
