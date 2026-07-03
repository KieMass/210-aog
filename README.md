# 210 AOG CMS - Phase 1 Foundation

A CMS-style website for 210 Christian AOG (Guyana) built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and MySQL.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM + MySQL (Aiven)
- **Authentication**: NextAuth (Phase 2)

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing site routes (Phase 2+)
│   ├── admin/             # Protected admin dashboard routes (Phase 2+)
│   └── api/               # API routes
├── components/
│   ├── public/            # Public site components
│   └── admin/             # Admin dashboard components
├── lib/
│   ├── prisma.ts          # Prisma client singleton
│   └── ...                # Other utilities
└── types/                 # TypeScript types and interfaces
```

## Setup Instructions

### 1. Configure Your Database Connection

You need a live MySQL database. This project is configured for **Aiven** (free tier).

1. Log in to your [Aiven console](https://console.aiven.io)
2. Copy your MySQL connection details:
   - Username
   - Password
   - Host
   - Port (typically 3306)
   - Database name (default: `defaultdb`)

3. Open `.env` and update the `DATABASE_URL`:

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:PORT/DBNAME?ssl-mode=REQUIRED"
```

**Important**: Aiven requires SSL, so the `ssl-mode=REQUIRED` parameter is mandatory.

Example (with placeholder values):
```env
DATABASE_URL="mysql://avnadmin:mypassword123@mysql-abc123.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Database Tables

Generate the Prisma client and run migrations to create all tables on the Aiven database:

```bash
npx prisma migrate dev --name init
```

This will:
- Create the Prisma client
- Create all tables (User, Sermon, Event, Announcement, Ministry, StaffMember, GalleryAlbum, GalleryPhoto, Page, SermonSeries)
- Generate the migration file in `prisma/migrations/`

If the migration succeeds, you should see output like:
```
✔ Your database is now in sync with your schema. Prisma migrated your database.

✔ Generated Prisma Client (v7.x.x) in ./node_modules/@prisma/client
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the default Next.js page.

## Verifying Prisma Connection

To verify that Prisma is connected to your Aiven database, you can use Prisma Studio:

```bash
npx prisma studio
```

This opens a web UI where you can view and manage your database tables.

## Database Schema

The Prisma schema includes:

- **User**: Admin users with roles (SUPER_ADMIN, EDITOR, CONTRIBUTOR)
- **Sermon**: Sermon content with YouTube links and sermon series association
- **SermonSeries**: Collections of sermons
- **Event**: Church events with recurrence support
- **Announcement**: News and updates
- **Ministry**: Church ministries
- **StaffMember**: Staff directory
- **GalleryAlbum** & **GalleryPhoto**: Photo galleries
- **Page**: Static/custom pages

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string for Aiven | `mysql://...?ssl-mode=REQUIRED` |

See `.env.example` for more options.

## Next Steps (Phase 2)

- Admin authentication with NextAuth
- Admin dashboard layout
- CRUD pages for content management
- Image upload handling
- Public site routing and styling

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Aiven MySQL](https://aiven.io/mysql)
