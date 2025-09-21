import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession["user"]
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: string | null | boolean;
  image?: string;
  address?: string;
  phone: string;
  status: boolean;
  timeZone: string | null;
  times: string[];
  stripe_customer_id?: string;
  createdAt: string;
  updateAt: string;
}