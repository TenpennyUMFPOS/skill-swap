"use server";

import {type Reject, type User } from "@prisma/client";
import prisma from "../db";
import { auth } from "@clerk/nextjs";

export default async function rejectAction(rejectedUser_id: string) {
  const { userId } = auth();
  if (!userId) return;

  
  await prisma.reject.create({
    data: {
      user_id: userId,
      rejectedUser_id: rejectedUser_id,
    },
  });
 
}
