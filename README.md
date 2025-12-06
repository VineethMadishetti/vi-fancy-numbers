# Vi Fancy Numbers

Live demo: https://vi-fancy-numbers.vercel.app

A lightweight React + Express app for listing and managing premium Vi mobile numbers. The client is a Vite React app (uses Bootstrap + Framer Motion) and the server is an Express API with MongoDB for persistence. Authentication uses JWT stored in an httpOnly cookie.

---

## Features

- Public listing of premium Vi numbers
- Admin-protected endpoints to add (single or bulk) and delete numbers
- Cookie-based JWT authentication (httpOnly cookie named `jwt`)
- Responsive UI with Bootstrap and custom styles
- Production-ready CORS, helmet, and rate-limiting configuration

---

## Repo Structure

- `client/` - Vite + React frontend
  - `src/` - components, pages, styles
  - `package.json` - client dependencies & scripts
- `server/` - Express backend
  - `routes/` - API routes
  - `controllers/` - request handlers
  - `models/` - Mongoose models
  - `config/db.js` - MongoDB connection
  - `server.js` - app entrypoint

---

## Quick Start (Development)

Prerequisites: Node.js (>=16), npm, MongoDB (or MongoDB Atlas).

1. Clone the repo

```bash
git clone <repo-url>
cd fancy-numbers
```

2. Start the server

```bash
cd server
npm install
# Create a .env file (see env section below)
npm run dev
```

3. Start the client

```bash
cd ../client
npm install
npm run dev
# Open http://localhost:5173
```

---

## Production Build

Client:

```bash
cd client
npm run build
# Deploy `client/dist` to Vercel/Netlify (Vite produces a `dist` when building)
```

Server:

```bash
cd server
npm install --production
npm start
```

Note: The project is configured for Vercel (client) + another host for the API (e.g., Render, Heroku). The server CORS configuration explicitly allows `https://vi-fancy-numbers.vercel.app` and `http://localhost:5173`.

---

## Environment Variables

Server (`server/.env`):

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret used to sign JWTs
- `PORT` - (optional) port for the server
- `NODE_ENV` - `development` or `production`

Client (`client/.env` - Vite env variables use the `VITE_` prefix):

- `VITE_API_URL` - full base API URL, e.g. `https://your-api.example.com/api` (optional; defaults to `http://localhost:5000/api`)

Important cookie note: the server sets the `jwt` cookie with `secure: true` and `sameSite: 'none'`. For cookies to work in production:

- The API must be served over HTTPS
- The client origin must be allowed in server CORS
- When testing locally without HTTPS, cookies may not persist due to `secure: true` — temporarily change `generateToken` cookie options or run both client and server with HTTPS for accurate testing.

---

## API Endpoints

Base URL: `/api`

Public

- `GET /api/numbers`
  - Returns: Array of number objects

Auth

- `POST /api/users/auth`
  - Body: `{ "email": "...", "password": "..." }`
  - Response: user object (server sets `jwt` cookie)

- `POST /api/users/logout`
  - Clears the `jwt` cookie

Protected (Admin only — require `jwt` cookie set)

- `POST /api/numbers`
  - Add a single number: `{ "number": "98765xxxxx" }`
  - Bulk add: `{ "numbers": ["98765xxxx1", "98765xxxx2"] }` (bulk insertion tolerates duplicates)

- `DELETE /api/numbers/:id`
  - Deletes number by id

Authentication details:

- The server reads JWT from cookie `jwt` and uses `JWT_SECRET` to verify.
- The cookie is `httpOnly`, `secure: true`, `sameSite: 'none'` and expires in 30 days.

Examples (curl):

```bash
# Login (returns JSON + sets cookie)
curl -X POST https://your-api.example.com/api/users/auth \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}' \
  -c cookies.txt

# Use the cookie to create a number
curl -X POST https://your-api.example.com/api/numbers \
  -H "Content-Type: application/json" \
  -d '{"number":"9876512345"}' \
  -b cookies.txt
```

---

## Admin Setup / Creating First User

The `authController` includes a `registerUser` handler (`POST /api/users`) intended to create a new user, but that route is commented out in `server/routes/userRoutes.js` in the current codebase. To create the initial admin user you can either:

- Temporarily enable the registration route by uncommenting the route in `server/routes/userRoutes.js`, restart the server, create the user, then re-comment the route; or
- Create a user document directly in MongoDB (insert a document with `email` and a bcrypt-hashed `password` matching the model), or
- Use a small Node script that imports `User` model and creates the user programmatically.

---

## Notes & Troubleshooting

- Build error `Could not resolve "../styles/hero.css"` means the imported stylesheet is missing. Ensure `client/src/styles/hero.css` exists (this repo includes it).
- If cookies are not being set in production, verify HTTPS, correct `VITE_API_URL`, and that the hosting provider doesn't strip cookies.
- CORS is limited to the two origins listed in `server.js`. Update CORS if you host from other domains.

---

## Development Tips

- The client uses `axios` with `withCredentials: true` and `VITE_API_URL` to contact the API.
- The header protection and rate limiting are already set up in `server/server.js`.
- Use `useReducedMotion()` from `framer-motion` in components if you want to respect users' reduced motion preferences.

---

## Deployment

- Client: Vercel (recommended). Set `VITE_API_URL` in Vercel Environment Variables to point to your API.
- Server: Any Node host with HTTPS (Render, Heroku, DigitalOcean App Platform). Provide `MONGO_URI` and `JWT_SECRET` as env vars.

---

## License

MIT

---

## Contact

Project maintained by the repository owner. For issues, open a GitHub issue or PR.
