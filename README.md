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
1. `npm i` or `npm install`: Initializes your project by downloading all the required packages listed in your package.json file. It creates a node_modules directory where all the dependencies will be stored.
2. Run `cp .env.example .env` and change the place holder to match with whatever provider you are using.
3. Run `docker compose up` to start the container or start it manually inside the docker desktop.
4. Run `npm run build` Build the project.
5. You can either `npm run start` or `npm run dev` to start the development server.
6. To test admin power, modify your url with `/admin` to get to login page and `admin` and `password` are you credentials. 

### If you schema files change:
You can either run `step 4` above or
- `npx prisma migrate dev`: Create prisma migration files. Should be run after changing the schema in `schema/prisma.schema`.
- `npx prisma generate`: Re-generate the prisma client. This will update the types in `@prisma/client` to reflect any changes in the schema.
- `npm run seed-db`: Runs a script defined to seed your database with initial data. The exact behavior will depend on how the seed-db script is defined, but it often involves running a script that inserts sample data into your database tables.

## Commands (to use during development)
- `npm run dev`: Start the development server.
- `npx prisma studio`: Start the database server and interact with your data in Prisma projects.
- `npm run build`: Build the project.(doing this can skip the step 4, 5, 6 above)
- `npm run start`: Start the production server.
- `npm run lint`: Lint the project.
- `npx prisma generate`: Re-generate the prisma client. This will update the types in `@prisma/client` to reflect any changes in the schema.
- `npx prisma migrate dev`: Create prisma migration files. Should be run after changing the schema in `schema/prisma.schema`.
- `npx prisma migrate reset`: Reset prisma migration files.
- 
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
