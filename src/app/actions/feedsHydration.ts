"use server";
import { Session, getServerSession } from "next-auth";
import { handler } from "../api/auth/[...nextauth]/route";
import { PrismaClient, User } from "@prisma/client";
import prisma from "../db";

export default async function feedsHydration(): Promise<User[]> {
  const session: Session = await getServerSession(handler) as Session;
  if (!session.user) throw new Error("No session found");
  const user = prisma.user.findUnique({ where: { email: session.user.email! } }) as unknown as User;
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
