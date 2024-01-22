"use server";

import { type User } from "@prisma/client";
import prisma from "../db";
import { auth } from "@clerk/nextjs";

export default async function feedsHydration(): Promise<User[]> {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");
  const user: User = await prisma.user.findUnique({ where: { id: userId } }) as unknown as User
  const feeds = await prisma.user.findMany({
    take: 10,
    where: {
      AND: [
        {
          NOT: {
            id: {
              in: (
                await prisma.like.findMany({
                  select: { likedUser_id: true },
                  where: { user_id: user.id },
                })
              ).map((like) => like.likedUser_id),
            },
          },
        },
        {
          NOT: {
            id: {
              in: (
                await prisma.reject.findMany({
                  select: { rejectedUser_id: true },
                  where: { user_id: user.id },
                })
              ).map((like) => like.rejectedUser_id),
            },
          },
        },
      ],
    },
  });
  if (feeds) return feeds;
  else return [];
}
