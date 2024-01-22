"use server";

import { type User } from "@prisma/client";
import prisma from "../db";
import { auth } from "@clerk/nextjs";

export default async function rejectAction(rejectedUser: User) {
  const { userId } = auth();
  if (!userId) return;
  const user: User = await prisma.user.findUnique({
    where: { id: userId },
  }) as unknown as User;
  const reject = await prisma.reject.create({
    data: {
      user_id: user.id,
      rejectedUser_id: rejectedUser.id,
    },
  });
 
}
