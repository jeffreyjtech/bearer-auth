# API Server

An API server utilizing full CRUD, database abstractions, and associations.

[Deployed API](https://jjtech-api-server.herokuapp.com/)

UML DIAGRAM WIP
![UML Diagram](./assets/uml-401-lab-4.jpg)

## Installation

1. Clone from this repo `git clone https://github.com/jeffreyjtech/api-server.git`
2. `cd` into `api-server`
3. Run `npm install`
4. Optionally, create an .env file with variable `PORT` to assign your preferred port number. The default `PORT` is `3000`.

## Usage

After installation, run `npm start`.

## Contributors / Authors

- Jeffrey Jenkins

### Credits

- Used this [Stack Overflow thread](https://stackoverflow.com/questions/50643965/jest-testing-try-catch) to test for unhandled errors with jest.

## Features / Routes

### Routes

- GET : `/magikarp[/:id]`
  - Parameters
    - Optional: an `id` param will specify a single record to return.
  - Response
    - status `200`, and a JSON body which is an array of all records in the table if `id` **is not** present, or a single record if `id` **is** present.
      - body: `{ // refer to schema }`
    - status `500`, `id` param is invalid.

- POST : `/magikarp`
  - Request body
    - Requires a JSON object with valid data shape and types per the `magikarp` schema.
  - Response
    - status `200`, and a JSON body of the record created in the DB.
      - body: `{ // refer to schema }`
    - status `500`, if JSON object is invalid per `magikarp` schema.

- PUT : `/magikarp/:id`
  - Parameters
    - Requires `id` param to specify record to update.
  - Request body
    - Requires a JSON object with a valid key-value pair to update the record.
  - Response
    - status `200`, and a JSON body of the updated record in the DB.
      - body: `{ // refer to schema }`
    - status `500`, if `id` param is invalid.

- DELETE : `/magikarp/:id`
  - Parameters
    - Requires `id` param to specify record to delete.
  - Response
    - status `200`, and an empty object`.
      - body: `{}`
    - status `500`, if `id` param is invalid.

#### `/species`

***The `/species` route has an identical endpoint set to `/magikarp`, except record data and request bodies will use the `species` schema***

### Schemas

#### `species` schema:

```js
{
  name: "Bulbasaur", // Required
  dexId: 1, // Required
  primaryType: "grass", // Required
  secondaryType: "poison" // Not required
}
```

#### `magikarp` schema:

```js
{
  name: "Golden boy", // Required
  shiny: true // Required
}
```
