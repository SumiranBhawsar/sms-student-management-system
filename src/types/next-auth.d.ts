import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client"; // 👈 your Prisma enum

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      rememberMe: boolean;
    } & DefaultSession["STUDENT"];
  }

  interface User {
    id: string;
    role: Role;
    rememberMe: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    rememberMe: boolean;
  }
}
