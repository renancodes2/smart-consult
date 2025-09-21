import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import GitHub from "next-auth/providers/github";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true
});
