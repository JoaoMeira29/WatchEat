# WatchEat: guide for coding agents

WatchEat is a learning project: an Angular 15 app (`frontend/`) and an Express 4 REST API (`backend/`) on Microsoft SQL Server. Users track films and series and order snacks for a viewing time. The UI text is Portuguese. See [README.md](README.md) for features and setup.

## Commands

Run each from the folder shown.

| Task | Folder | Command |
| --- | --- | --- |
| Start the API with auto-restart (port 3000) | `backend/` | `npm run dev` |
| Run backend tests that need no database | `backend/` | `npm run test:unit` |
| Run all backend tests | `backend/` | `npm test` |
| Run one backend test file | `backend/` | `npx jest tests/password.test.js` |
| Start the app (port 4200) | `frontend/` | `npm start` |
| Build the app | `frontend/` | `npm run build` |
| Type-check frontend specs | `frontend/` | `npx tsc -p tsconfig.spec.json --noEmit` |

- The backend needs `backend/.env` (copy `backend/.env.example`). Never commit it, print it, or change the password in it.
- The tests in `backend/tests/integration` need the database with the data from `database/seed.sql`. Everything else in `backend/tests` mocks the services and runs anywhere.
- There is no linter. After a backend change, run `npm run test:unit`. After a frontend change, run the build.
- CI (`.github/workflows/ci.yml`) runs the backend unit tests and the frontend build on Node 18.
- Do not run `npm audit fix --force`. It applies major upgrades that have not been tested.

## Layout

```
backend/
  app.js            Express setup: security headers, CORS, rate limit, routes, error handler
  routes/           URL + middleware chain for each endpoint
  controllers/      Request handlers
  services/         One file per table group; raw SQL through the mssql driver
  middleware/       authVerify, rolesAuthorization, ownership, renewPremium,
                    expireUnpaidOrders, suspendAfterRejectedEdits
  utils/            constants.js (status and role values), password.js (scrypt),
                    validation.js (request checks), errors.js (HttpError, handleError)
  tests/            Jest unit tests
  tests/integration Tests that need the database
frontend/src/app/
  features/         One folder per page
  shared/services/  One HTTP service per API resource; auth/ has the guards and the 401 interceptor
  shared/components Header, footer, not-found
frontend/src/environments/environment.ts   API base URL
database/
  schema.sql        Source of truth for tables and columns
  seed.sql          Sample data and development accounts (UTF-8 with BOM; keep the BOM)
```

## Conventions

- **English** for file names, folder names, function names, Angular classes, API URLs and page URLs.
- **Portuguese stays** in database tables and columns (`Utilizador`, `Conteudo`, `Nome`), in the JSON fields that come from them, in the constants in `utils/constants.js`, and in UI text and error messages. Do not translate these; the values are stored in the database.
- **API URLs** are lowercase, plural and REST-style under `/api`: `/users/:Id`, `/users/:userId/orders`, `/contents/movies`. Route parameter names (`:Id`, `:userId`, `:contId`) are read by the controllers, so keep them as they are.
- **Route order matters**: declare fixed paths before parameter paths (`/contents/movies` before `/contents/:Id`).
- **Errors**: services throw. Controllers end every `catch` with `return handleError(res, error)`. To refuse a request with a message the user may see, throw `new HttpError(status, message)`. Anything else is logged on the server and answered with a generic 500, so never send `error.message` to the client.
- **Validation**: check request bodies on the server with the functions in `utils/validation.js`; the Angular forms are not a security boundary.
- **SQL is always parameterised** with `.input(...)`. Never build SQL from request values.
- **Several writes that belong together** go in one `sql.Transaction` (see `createOrderWithProducts` in `services/orderService.js`).
- **Passwords** go through `utils/password.js`. Plain-text passwords from old data are upgraded on login; keep that path working.
- **The logged-in user**: `authVerify` reads the account from the database on every request and stores `{ Id, Utilizador_Roles }` at `req.user.user.user[0]`. Read it with `getTokenUser` and `isOwnerOrAdmin` from `middleware/ownership.js`. Role middlewares must come after `authVerify` in the route.
- **Whose data it is**: take the user id from the token, not from the request body. Any endpoint with a user id in the URL or body needs an ownership check (`checkParamOwner`, `checkBodyOwner`) unless reading other users' data is intended.
- **The token** carries only `Id` and `Utilizador_Roles`. Do not add personal data to it.
- **Frontend API calls** use `environment.apiUrl`. Do not hard-code `http://localhost:3000`.
- **Frontend pages for one role** use `RoleGuard` with `data: { roles: [...] }` in `app.module.ts`. This only hides the page; the API must enforce the role too.
- Match the surrounding code style: CommonJS, 4-space indent and `'use strict'` in the backend; Angular CLI defaults in the frontend.

## Working rules

- The owner makes the commits. Prepare the change, then give the `git` commands and a commit message in English.
- Work on a branch, not on `main`.
- When you rename or move a file, use `git mv` and update every reference, the README and this file.
- When you add or change a table or column, update `database/schema.sql` and `seed.sql` in the same change.
- Add a unit test for every bug fix and every new rule, mocking the services as the existing tests do.
- Say plainly what you verified and what you could not. Flows that write to the database can only be confirmed against a real database.

## Known issues

From a review on 2026-10-13. The serious items from that review are fixed. Remove an item when it is fixed.

### Security

- Payments are simulated, so Premium is free to anyone who clicks "pay".
- No HTTPS; `ENCRYPT=false` for the database connection.
- The token is kept in `localStorage`, readable by any script on the page.
- Validation covers registration, login, orders, payments and reviews only. Content, profile, library and friendship bodies are not validated.
- The rate limit covers `/api/auth` only.

### Correctness

- Dates: `HoraReservada` is stored as the local time the user typed, while `HoraReserva` and payment dates are stored in UTC. Comparisons between them are off by the server's UTC offset.
- Paying a payment and granting what it was for are separate queries, not one transaction.
- Two endpoints read data with `POST` (`/libraries/:userId/content/find` and `/content/check`).
- `GET /libraries/:userId/top-movies` and `/top-series` return five rows, while the frontend names say six.

### Missing

- Tests for the library and friendship flows; the frontend spec files are CLI boilerplate.
- Linting, a licence, pagination on list endpoints.
- A production setup: separate frontend environments and deployment notes.

### Cleanup

- Pending major upgrades: Angular 15 (out of support) and `mssql`. Most remaining `npm audit` alerts come from these.
- Frontend: heavy use of `any`, `window.location.reload()` after actions, `setTimeout` used to wait for requests, component methods and properties still named in Portuguese.
- Not built: the header search box, pages for couriers and menus.
