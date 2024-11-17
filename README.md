# Car Listing
Built with Next.js and Prisma.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js**
- **npm**
- A **PostgreSQL** or **MySQL** database (or other supported database)
- **docker**

### Configuration
1. Create a `.env` file in the root directory of your project.
2. Add the following line to your `.env` file, make sure the placeholders match with your actual docker credentials:
   ```plaintext
   DB_URL="provider://username:password@localhost:port/database"

OR: `cp .env.example .env` and change the URL
(make sure your docker is connected before build or run the project,
you can either use `docker compose up` to start the container or start it manually inside the docker desktop)
3. `npm i` or `npm install`: Initializes your project by downloading all the required packages listed in your package.json file. It creates a node_modules directory where all the dependencies will be stored.
4. `npm run prisma:generate`: Re-generate the prisma client. This will update the types in `@prisma/client` to reflect any changes in the schema.
5. `npm run prisma:migrate`: Create prisma migration files. Should be run after changing the schema in `schema/prisma.schema`.
6. `npm run seed-db`: Runs a script defined to seed your database with initial data. The exact behavior will depend on how the seed-db script is defined, but it often involves running a script that inserts sample data into your database tables.

## Commands (to use during development)
- `npm run dev`: Start the development server.
- `npx prisma studio`: Start the database server and interact with your data in Prisma projects.
- `npm run build`: Build the project.(doing this can skip the step 4, 5, 6 above)
- `npm run start`: Start the production server.
- `npm run lint`: Lint the project.
- `npm run prisma:generate`: Re-generate the prisma client. This will update the types in `@prisma/client` to reflect any changes in the schema.
- `npm run prisma:migrate`: Create prisma migration files. Should be run after changing the schema in `schema/prisma.schema`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
