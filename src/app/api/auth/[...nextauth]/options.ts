import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const prisma = new PrismaClient();
        const userFromdb = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });
        if (userFromdb && userFromdb.password === credentials?.password) {
          // Any object returned will be saved in `user` property of the JWT

          return {
            id: userFromdb.id,
            name: userFromdb.first_name + " " + userFromdb.last_name,
            email: userFromdb.email,
            image: userFromdb.avatar_url,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      return session;
    },
  },
};
