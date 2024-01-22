"use server";

import { type Like, type User } from "@prisma/client";
import prisma from "../db";
import { auth } from "@clerk/nextjs";
import { addDoc } from "firebase/firestore";
import { matchesCollectionRef } from "../../../initializeFirebase.local";

export default async function likeAction(likedUser_id: string) : Promise<boolean>{
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");
  const isMatch: boolean =
    (await prisma.like.findFirst({
      where: { likedUser_id: userId, user_id: likedUser_id },
    })) != null;

  if (isMatch) {
    addDoc(matchesCollectionRef, {
      user_id: userId,
      matchedUser_id: likedUser_id,
    });
  }
  await prisma.like.create({
    data: {
      user_id: userId,
      likedUser_id: likedUser_id,
    },
  });
  return isMatch === undefined ? false : isMatch ;
}

