# Ahsan's Cattle Farm — Full-Stack App (React + Node/Express + MongoDB)

This is the database-backed version of the site: a public storefront (cattle, dairy
animals, goats, feed & fodder, fresh milk) plus an **Admin Dashboard** where you can
log in and add, edit or delete any listing — including uploading real photos —
without touching any code.

```
fullstack/
├── server/      → Node.js + Express + MongoDB API
└── client/      → React (Vite) website that talks to the API
```

---

## 1. Install the tools you need (one-time)

1. **Node.js** (v18 or newer) — https://nodejs.org — download the LTS installer.
2. **A MongoDB database.** Easiest option, no install required:
   - Go to https://www.mongodb.com/cloud/atlas/register and make a free account.
   - Create a free "M0" cluster (takes ~2 minutes).
   - Under **Database Access**, create a database user (username + password).
   - Under **Network Access**, click "Add IP Address" → "Allow access from anywhere" (fine for development).
   - Click **Connect** → **Drivers** → copy the connection string. It looks like:
     `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`
   - Add a database name to the end of it, e.g. `.../ahsans-cattle-farm?retryWrites=true&w=majority`

   *(Alternative: install MongoDB Community Server locally from
   https://www.mongodb.com/try/download/community and use
   `mongodb://127.0.0.1:27017/ahsans-cattle-farm` instead — no cloud account needed.)*

3. **VS Code** with two integrated terminals (or any two terminal windows) — you'll run the server and the client at the same time.

---

## 2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` — the connection string from step 1
- `JWT_SECRET` — any long random string (mash your keyboard)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — the login you'll use for the Admin Dashboard

Then load the starting content (same animals/breeds/feed/milk as the static site) and create your admin account:

```bash
npm run seed
```

You should see `Inserted 23 animals/products.` and `Created admin account "..."`.

Start the API:

```bash
npm start
```

You should see `API running on http://localhost:5000`. Leave this terminal running.

---

## 3. Set up the client

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). The site should load with all your seeded animals, and `/admin/login` lets you log in with the username/password from your `.env` file.

---

## 4. Using the Admin Dashboard

Once logged in (`/admin`):
- Switch between **Qurbani Cattle / Dairy Animals / Goats / Feed & Fodder / Fresh Milk** tabs
- **+ Add Listing** to create a new animal, breed, or product
- **Edit** any row to change its text, specs, or upload a real photo
- **Delete** removes a listing (asks for confirmation first)
- Uploaded photos are stored in `server/uploads/` and served automatically

Every change shows up on the public site immediately — no rebuild needed.

---

## 5. Everyday use (after the one-time setup above)

Each time you want to work on or run the site:

```bash
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm run dev
```

---

## How the pieces fit together

- **`server/models/Animal.js`** — the shape of every listing: title, category (`cattle` / `dairy` / `goats` / `feed` / `milk`), description, image, icon, specs, origin, availability, display order.
- **`server/routes/animalRoutes.js`** — the public API (`GET /api/animals?category=goats`) and the admin-only write routes (create/update/delete), protected by `middleware/auth.js`.
- **`server/routes/authRoutes.js`** — admin login, returns a JWT token the client stores and sends with every admin request.
- **`server/routes/uploadRoutes.js`** — handles photo uploads (JPG/PNG/WEBP, 5MB max) from the Admin Dashboard.
- **`client/src/pages/CategoryPage.jsx`** — one page component that renders Cattle, Dairy, Goats, Feed, or Milk depending on the URL, fetching live data from the API.
- **`client/src/pages/AdminDashboard.jsx`** — the whole admin UI: tabs, table, add/edit form with image upload and a spec-row editor.
- **`client/src/components/DetailModal.jsx`** — clicking any listing opens a detail popup with a "You may also like" row of related items, same as the static site.

## Changing the look
Colors, fonts, and card styles all live in `client/src/styles/theme.css` — the same
brass/green/cream palette as the original static site. Edit the CSS variables at the
top of that file to change the whole site's colors at once.

## Phase 1 additions (new categories, filters, livestock details)

On top of the original 5 categories, the site now also has:
- **Services** page (fattening, breeding, consultancy, delivery)
- **Goats & Sheep** page now includes sheep breeds too (Kajli, Lohi)
- **Dairy Products** page (renamed from "Fresh Milk") now includes ghee, butter, paneer, dahi, khoya
- Every livestock listing can now have a **Tag Number, Age, Weight (kg), Price (PKR)** and an **Available/Sold** status — editable from the Admin Dashboard
- A **search box + Available/Sold filter** on the Cattle, Dairy Animals, and Goats & Sheep pages
- A floating **WhatsApp button** on every page
- A **Farm Highlights** section on the Home page

**If you already ran `npm run seed` before this update**, your existing listings are untouched — to add the new items (buffalo/sheep breeds, dairy products, services) without wiping anything, run this once in the `server` folder:

```
npm run add-more
```

This only adds items that don't already exist, so it's safe to run more than once.

### Still to come (not built yet)

The full vision also includes: About Us page, a photo/video Gallery, a Customer Reviews
section, an Eid/Qurbani advance-booking flow with a weight calculator, a Contact inquiry
form that saves to the database, FAQs, and a Blog. These are bigger pieces being built
next — ask to continue whenever you're ready for the next phase.

## Adding real photos

Once you have real photos of your goats, dairy animals, feed, or milk products, log in
to `/admin`, edit the relevant listing, and use the **Photo** upload field — no code
changes needed. Until a photo is uploaded, the emoji in the **Icon** field is shown instead.

## Deploying this for real (going live on the internet)

This README covers running it on your own laptop for development. To put it on the
internet so customers can visit it from anywhere, you'd typically:
1. Deploy `server/` to a Node hosting service (e.g. Render, Railway, or a VPS) and point `MONGO_URI` at your Atlas cluster.
2. Deploy `client/` (`npm run build` → the `dist/` folder) to a static host (e.g. Netlify, Vercel) or serve it from the same server.
3. Update the client's API calls to point at your deployed server's URL instead of relying on the local dev proxy in `vite.config.js`.

That's a separate step from this local setup — ask if you'd like help with it once you're ready to go live.
