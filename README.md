# WatchEat

WatchEat is a web app for tracking the films and series you watch, and for ordering snacks to arrive at the time you plan to watch them.

It has two parts: an Angular single-page app ([frontend/](frontend/)) and an Express REST API backed by SQL Server ([backend/](backend/)). The user interface is in Portuguese.

## Features

- **Catalogue**: browse films and series, with genres, cast, synopsis and trailer.
- **Watch'List**: add content to a personal library and mark it as *Para Assistir*, *Assistindo*, *Em Espera*, *Terminado* or *Cancelado*.
- **Friends**: send friend requests by email, accept or decline them, and view friends' profiles.
- **Premium tier**: a monthly subscription that unlocks reviews, library visibility settings (public, private or friends only), statistics, and proposing edits to content.
- **Moderated edits**: an admin accepts or rejects each edit proposed by a Premium user. A user with three rejected edits is suspended.
- **Snack orders**: pick products, reserve a delivery time, and pay. An order that is still unpaid one hour before its reserved time expires.
- **Payments**: a history of order and subscription payments. A Premium payment not made by the 8th of the month downgrades the account to Normal.
- **Admin**: add films and series, and see all users, orders and payments.

### Roles

| Role | Can do |
| --- | --- |
| Normal | Browse the catalogue, manage a Watch'List, add friends, order products |
| Premium | Everything above, plus reviews, library visibility, statistics, and proposing content edits |
| Admin | Everything above, plus adding content and moderating proposed edits |

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular 15, Tailwind CSS 3, RxJS |
| Backend | Node.js, Express 4, JSON Web Tokens |
| Database | Microsoft SQL Server, through the `mssql` driver |
| Tests | Jest and Supertest (backend), Karma and Jasmine (frontend) |

## Getting started

### Prerequisites

- Node.js 18 (Angular 15 supports Node 14.20, 16.13 and 18.10 or later 18.x releases)
- npm
- A SQL Server instance you can create a database in

### 1. Database

The repository does not include a schema or seed script yet. Create the database and its tables by hand, using the definitions in [backend/models/](backend/models/) for the table and column names.

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```ini
PORT=3000
HOST=localhost
HOST_URL=http://localhost:3000

SQL_SERVER=localhost
SQL_DATABASE=WatchEat
SQL_USER=your_user
SQL_PASSWORD=your_password
ENCRYPT=false

SECRET_TOKEN=a-long-random-string
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Port the API listens on. Keep it at `3000`, because the frontend calls `http://localhost:3000` directly. |
| `HOST`, `HOST_URL` | Host name and base URL of the API. `PORT` and `HOST` are required at startup. |
| `SQL_SERVER`, `SQL_DATABASE`, `SQL_USER`, `SQL_PASSWORD` | SQL Server connection details. |
| `ENCRYPT` | Set to `true` to encrypt the database connection. |
| `SECRET_TOKEN` | Secret used to sign and verify login tokens. |

Start the API:

```bash
npm start
```

It runs under `nodemon` at `http://localhost:3000`.

### 3. Frontend

```bash
cd WatchEat
npm install
npm start
```

Open `http://localhost:4200`.

## Tests

```bash
# Backend (Jest + Supertest)
cd backend
npm test

# Frontend (Karma + Jasmine)
cd WatchEat
npm test
```

The backend tests run against the database configured in `.env` and expect specific users to exist in it, such as `user1@gmail.com`.

## Project structure

```
frontend/                    Angular app
  src/app/
    features/                One folder per page (login, biblioteca, pedidos, ...)
    _shared/components/      Header, footer, not-found page
    _shared/services/        One HTTP service per API resource, plus AuthService
  src/assets/                Logos and product images

backend/                     Express API
  server.js                  Entry point
  app.js                     Middleware and route registration
  config.js                  Reads .env
  routes/                    URL definitions and the middleware each one requires
  controllers/               Request handlers
  services/                  SQL queries
  middleware/                Token check, role checks, payment and suspension rules
  models/                    Table definitions
  utils/constants.js         Status and role constants
  tests/                     Jest tests
```

## API overview

All endpoints are under `/api`. Apart from login, registration, and reading the catalogue and genres, every endpoint needs a token, sent as `Authorization: Bearer <token>`. Tokens expire after one hour.

| Area | Example endpoints | Route file |
| --- | --- | --- |
| Auth | `POST /authLogin`, `POST /authRegister` | [authRoutes.js](backend/routes/authRoutes.js) |
| Content | `GET /Conteudos`, `GET /Conteudos/Filmes`, `GET /Conteudo/:Id`, `POST /Conteudo/Filme` | [conteudoRoutes.js](backend/routes/conteudoRoutes.js) |
| Genres and actors | `GET /Generos` | [generoRoutes.js](backend/routes/generoRoutes.js), [atorRoutes.js](backend/routes/atorRoutes.js) |
| Users and friends | `GET /Utilizador/:Id`, `POST /UtilizadorAmizadeByEmail/:userId` | [utilizadorRoutes.js](backend/routes/utilizadorRoutes.js) |
| Library | `GET /Biblioteca/:userId`, `PUT /BibliotecaVisibilidade/:userId` | [bibliotecaRoutes.js](backend/routes/bibliotecaRoutes.js) |
| Reviews | `POST /ReviewPremium/:userId` | [reviewsPremiumRoutes.js](backend/routes/reviewsPremiumRoutes.js) |
| Content edits | `POST /AlteracaoConteudo`, `PUT /AlteracaoConteudo` | [alteracaoConteudoRoutes.js](backend/routes/alteracaoConteudoRoutes.js) |
| Products and menus | See route files | [produtoRoutes.js](backend/routes/produtoRoutes.js), [menuRoutes.js](backend/routes/menuRoutes.js) |
| Orders | `POST /Pedido`, `GET /UserPedidos/:userId` | [pedidoRoutes.js](backend/routes/pedidoRoutes.js) |
| Payments | `GET /UserPagamentos/:userId`, `PUT /Pagamento/:Id` | [pagamentoRoutes.js](backend/routes/pagamentoRoutes.js) |
| Couriers | See route file | [estafetaRoutes.js](backend/routes/estafetaRoutes.js) |
| Statistics | `GET /Estatisticas` | [estatisticasRoutes.js](backend/routes/estatisticasRoutes.js) |

## Known limitations

This is a learning project and is not ready for production use.

- Any logged-in user can read another user's profile and library, whatever the library's visibility setting.
- Payments are simulated. No payment provider is connected.
- There is no database schema or seed script in the repository.
- The API address is hard-coded in the frontend.
- The search box in the header is not connected to anything yet.
- Couriers and menus exist in the API but have no pages in the app.

Ideas from the original plan that are not built yet: importing catalogue data from an external film API, filtering by genre, actor, director or duration, connecting orders to an external food provider, and tracking the courier.
