import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { SessionStrategy } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(db),
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter an email and password");
                }
                const user = await db.uSERS.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                    throw new Error("User doesn't exist");
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isCorrectPassword) {
                    throw new Error("Incorrect password");
                }
                return {
                    id: `${user.id}`,
                    email: user.email,
                    full_name: user.full_name,
                    password: user.password,
                };
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    debug: process.env.NODE_ENV === "development",
};