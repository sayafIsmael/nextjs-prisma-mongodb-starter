// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    role?: string; // Add the role property to the Session type
  }
}