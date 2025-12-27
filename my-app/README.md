This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Railway PostgreSQL notes

- Configure your database connection with `DATABASE_URL` (or `DATABASE_PUBLIC_URL`/`POSTGRES_URL`) or the `PGHOST`/`PGPORT`/`PGUSER`/`PGPASSWORD`/`PGDATABASE` variables that Railway exposes for managed PostgreSQL services.
- On first request the app will run migrations automatically; if any of the variables above are missing, startup will fail with a message listing the detected values.
- Example log from a healthy Railway PostgreSQL service (helpful for sanity checks):

```
2025-12-27 17:34:24.434 UTC [3] LOG:  starting PostgreSQL 17.7 (Debian 17.7-3.pgdg13+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit
2025-12-27 17:34:24.434 UTC [3] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2025-12-27 17:34:24.434 UTC [3] LOG:  listening on IPv6 address "::", port 5432
2025-12-27 17:34:24.457 UTC [3] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-12-27 17:34:24.466 UTC [78] LOG:  database system was shut down at 2025-12-27 17:34:24 UTC
2025-12-27 17:34:24.474 UTC [3] LOG:  database system is ready to accept connections
2025-12-27 17:39:24.565 UTC [76] LOG:  checkpoint starting: time
2025-12-27 17:39:28.994 UTC [76] LOG:  checkpoint complete: wrote 47 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=4.415 s, sync=0.005 s, total=4.430 s; sync files=12, longest=0.004 s, average=0.001 s; distance=270 kB, estimate=270 kB; lsn=0/19591D8, redo lsn=0/1959180
```
