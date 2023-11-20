## Next.js Fullstack Development Admin Panel Starter Kit
Technologies:
- Tailwind CSS
- ShadcnUi
- Cloudinary
- NextAuth
- Prisma
- Mongodb

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/sayafIsmael/nextjs-prisma-mongodb-starter.git
```

## Getting Started
Configure .env file:
Add `NODE_ENV` "production" or "development"
Add `NEXTAUTH_SECRET` with a secure string
Add `DATABASE_URL` of your mongodb
You can also use other database like MySql. You have to modify a little in schema.prisma file in prisma folder


### Install packages

```shell
npm i
npx prisma db push
npx prisma db seed
```

### Start the app

```shell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudinary
Add Cloudinary name in .env file with `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
Import component from `@/components/ui/image-upload` to upload image and preview

Running commands with npm `npm run [command]`

| command         | description                             |
| :-------------- | :---------------------------------------|
| `build`         | Build a production instance of the app  |
| `start`         | Starts a production instance of the app |


Before build the application please set the `NODE_ENV` to `production` in .env file

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
