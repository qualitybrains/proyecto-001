import { db } from "@/lib/db";

export const getUserProfile = async (email: string) => {
    const user = await db.uSERS.findUnique({
        select: {
            email: true,
            full_name: true,
            points: true,
            password: false,
        },
        where: {
            email,
        },
    });
    return user;
}