import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prismadb";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials!");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials!");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Fetch the user's role information from the database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          include: { role: true }, // Assuming 'role' is the name of the relation in your Prisma model
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role?.name; // Adjust the property based on your Prisma model
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
