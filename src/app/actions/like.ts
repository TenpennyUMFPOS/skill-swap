"use server"

import { Session, getServerSession } from "next-auth"
import { handler } from "../api/auth/[...nextauth]/route"
import { PrismaClient, User } from "@prisma/client";
import prisma from "../db";

export default async function likeAction(likedUser: User) {
    const session: Session = await getServerSession(handler) as Session
    if (!session.user) return

    const user: User = await prisma.user.findUnique({ where: { email: session.user.email! } }) as unknown as User
    const like = await prisma.like.create({
        data: {
            user_id: user.id,
            likedUser_id: likedUser.id,
        }
    })
    console.log(like)

}