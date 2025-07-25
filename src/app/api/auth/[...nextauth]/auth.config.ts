import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const DEFAULT_MAX_AGE = 24 * 60 * 60;
const REMEMBER_ME_MAX_AGE = 7 * 24 * 60 * 60;

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // 👑 Auto-create default admin if no user found and email is ADMIN
          if (!user && credentials.email === process.env.ADMIN_EMAIL) {
            const hashedPassword = await bcrypt.hash(credentials.password, 12);

            const createdUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: hashedPassword,
                role: "ADMIN",
              },
            });

            await prisma.admin.create({
              data: {
                userId: createdUser.id,
              },
            });

            const adminProfile = await prisma.profile.create({
              data: {
                userId: createdUser.id,
                firstName: "Sumiran",
                lastName: "Bhawsar",
                contactPhone: "4565123210",
              },
            });

            return {
              id: createdUser.id,
              name: `${adminProfile.firstName} ${adminProfile.lastName}`,
              email: createdUser.email,
              role: createdUser.role,
              rememberMe: credentials.rememberMe === "true",
            };
          }

          // 🚫 User not found and not admin
          if (!user) {
            return null;
          }

          // ✅ Validate password
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) return null;

          // Optional: fetch profile for display name
          const profile = await prisma.profile.findUnique({
            where: { userId: user.id },
          });

          return {
            id: user.id,
            name: profile ? `${profile.firstName} ${profile.lastName}` : "User",
            email: user.email,
            role: user.role,
            rememberMe: credentials.rememberMe === "true",
          };
        } catch (error) {
          console.log("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // console.log("next auth signin : ", user, account);

      if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      // console.log("check user : ", user);
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.rememberMe = user.rememberMe ?? false;
        token.email = user.email;

        token.maxAge = user.rememberMe ? REMEMBER_ME_MAX_AGE : DEFAULT_MAX_AGE;
      }
      // console.log("token", token); //?dev
      return token;
    },

    async session({ token, session }) {
      if (session.user) {
        // console.log("token.role", token.role);

        session.user.role = token.role;
        session.user.id = token.id;
        session.user.rememberMe = token.rememberMe;
      }
      // console.log("session data : ", session);

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: DEFAULT_MAX_AGE,
  },
  pages: {
    signIn: "/login", // custom login page optional
  },
  secret: process.env.NEXTAUTH_SECRET,
};
