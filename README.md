# Bearer Auth

This API is able to handle users signing up, signing in, and verifying the integrity of both `Basic` auth strings and `Bearer` tokens. With the latter feature, it prevents un-authorized operations on the API's resources.

[Deployed API](https://jjtech-bearer-auth.herokuapp.com/)

<!-- Insert UML diagram here -->
![UML Diagram](./assets/lab-uml.jpg)

## Installation

1. Clone from this repo `git clone https://github.com/jeffreyjtech/bearer-auth.git`
2. `cd` into `bearer-auth`
3. Run `npm install`
4. Optionally, create an .env file with variable `PORT` to assign your preferred port number. The default `PORT` is `3000`.

## Usage

After installation, run `npm start`.

## Contributors / Authors

- Jeffrey Jenkins

## Features / Routes

### Token Security Options

Token security can be enhanced with the following options:

- `TOKEN_SINGLE_USE`: If this environment variable is set to `true`, tokens will expire immediately after use.
- `TOKEN_EXPIRATION`: If this environment variable is set to `true`, tokens will expire after 10 minutes.

### Routes

- POST : `signup`
  - Required: Request body
    - Requires a JSON body containing a key-value pair for a `username` and a `password`.
  - Response
    - status `200`, and a JSON body which is the `user` record created in the database.
      - body: `{ // refer to schema }`
    - status `500`, `id` param is invalid.

- POST : `/signin`
  - Required: Authorization header
    - Requires a `Basic` authorization header containing a base-64-encoded `username:password` auth string.
  - Response
    - status `200`, and a JSON body which is the `user` record which matches the given username and password.
    - status `403`, if auth string is invalid.

- POST : `/users`
  - Required: Authorization header
    - Requires a `Bearer` authorization header containing a valid sign-in token.
  - Response
    - status `200`, and a JSON body of all the usernames present in the `users` table.
    - status `403`, if sign-in token is invalid.

#### `/users` route

### Schemas

#### `users` schema:

```js
{
  username:: "testUser", // Required and must be unique
  password:: "secret" // Required
  token: "<jwt-signed-token>" // A generated jwt created on get and set in combination with a secret.
  usedTokenUUIDs: "<concatenated string of token UUID>" // A list of used Token UUIDs, used to enforce single-use tokens.
}
```
