"use server";
import { auth } from "@clerk/nextjs";
import prisma from "../db";

export default async function checkProfileCompleted() {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profile_completed: true },
  });

  if (user?.profile_completed) return true;
  else return false;
}
