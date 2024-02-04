import { User } from "@prisma/client";
import { getDownloadURL, ref } from "firebase/storage";
import prisma from "../db";
import { storage } from "../../../initializeFirebase.local";
export default async function GetAvatarURL(user_id: string) {
  const user: User = (await prisma.user.findUnique({
    where: { id: user_id },
  })) as unknown as User;
  const avatarStorageRef = ref(storage, user.avatar_url);
  const url = await getDownloadURL(avatarStorageRef);
  return url;
}
