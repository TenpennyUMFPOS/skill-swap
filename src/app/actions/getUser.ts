'use server'
import prisma from "../db"

export default async function GetUser(user_id: number) {
    const user = await prisma.user.findUnique({
        where: { id: user_id }, select:
        {
            id: true,
            first_name: true,
            last_name: true,
            avatar_url: true,
        }
    })
    if (!user) return null
    return user
}