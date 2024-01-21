"use server"

import { Session, getServerSession } from "next-auth"
import { handler } from "../api/auth/[...nextauth]/route"
import { PrismaClient, User } from "@prisma/client";
import prisma from "../db";
export default async function rejectAction(rejectedUser: User) {
    const session: Session = await getServerSession(handler) as Session
    if (!session.user) return
    const user: User = await prisma.user.findUnique({ where: { email: session.user.email! } }) as unknown as User
    const reject = await prisma.reject.create({
        data: {
            user_id: user.id,
            rejectedUser_id: rejectedUser.id
        }
    })
    console.log(reject)
}