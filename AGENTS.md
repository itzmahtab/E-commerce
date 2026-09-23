# AGENTS.md

## Project Structure

- **Server**: Express 5 backend in `server/` folder
- **Entry point**: `server/index.js`
- **Config**: `server/.env` (required for running)

## Commands

```bash
# Development (auto-reload)
cd server && npm run dev

# Production
cd server && npm start
```

## Key Details

- **Module system**: ES modules (`"type": "module"` in package.json)
- **Database**: PostgreSQL (`pg` package), auto-creates tables on startup via `createTables()`
- **Ports**: Server runs on `process.env.PORT` (default 4000)
- **No tests**: `npm test` is a no-op placeholder

## Environment Setup

Create `server/.env` with required variables:
- `PORT`, `FRONTEND_URL`, `DASHBOARD_URL`
- `JWT_SECRET_KEY`, `JWT_EXPIRES_IN`, `COOKIE_EXPIRES_IN`
- `SMTP_*` (for email), `CLOUDINARY_*`, `STRIPE_*`

## Dependencies

Key packages: Express, pg, JWT, bcrypt, Stripe, Cloudinary, Nodemailer, cookie-parser, cors, express-fileupload

## Notes

- Config is loaded from `./.env` via dotenv in both `app.js:11` and `index.js:5`
- File uploads stored in `./uploads/` (temp directory)