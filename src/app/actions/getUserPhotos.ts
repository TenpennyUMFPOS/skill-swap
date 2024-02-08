"use server";
import prisma from "../db";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase";
export default async function getUserPhotos(userId: string) {
  const photos = await prisma.photo.findMany({
    where: {
      user_id: userId,
    },
  });
  if (!photos) return null;
  const photosUrls = [];
  for (let i = 0; i < photos.length; i++) {
    let photosStorageRef = ref(storage, photos[i].url);
    let url = await getDownloadURL(photosStorageRef);
    photosUrls.push(url);
  }
  return photosUrls;
}
