"use server"

import { getServerSession } from "next-auth"
import { handler } from "../api/auth/[...nextauth]/route"
import { PrismaClient, User } from "@prisma/client";
import prisma from "../db";

export default async function likeAction(likedUser: User) {
    const session = await getServerSession(handler)
    if (!session) return


    const user: User = await prisma.user.findUnique({ where: { email: session.user.email } });
    const like = await prisma.like.create({
        data: {
            user_id: user.id,
            likedUser_id: likedUser.id,
        }
    })
    console.log(like)

}