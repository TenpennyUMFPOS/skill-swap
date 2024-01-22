"use server";

import { type User } from "@prisma/client";
import prisma from "../db";
import { auth } from "@clerk/nextjs";

export default async function likeAction(likedUser: User) {
  const { userId } = auth();
  if (!userId) return;
  const user: User =await prisma.user.findUnique({
    where: { id: userId },
  }) as unknown as User;
  const like = await prisma.like.create({
    data: {
      user_id: user.id,
      likedUser_id: likedUser.id,
    },
  });
  
}
