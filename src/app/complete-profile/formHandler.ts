"use server";
import { storage } from "../../../initializeFirebase.local";
import { ref, uploadBytes } from "firebase/storage";
import { auth, currentUser } from "@clerk/nextjs";
import { File } from "buffer";
import { createHash } from "crypto";
import sharp from "sharp";
import prisma from "@/app/db";
import { RedirectType, redirect } from "next/navigation";

type UserData = {
  avatar: File;
  first_name: string;
  last_name: string;

  gender: string;
  birth: string;
  about: string;
  skills: { skill: string }[];
  photos: {
    url: string;
  }[];
  socials?: {
    personnal_website?: string;
    linkedin_url?: string;
    github_url?: string;
    twitter_url?: string;
    facebook_url?: string;
    instagram_url?: string;
  };
};
export default async function formHandler(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User not authenticated");
  const user = await currentUser();
  console.log(user);
  let photos: string[] = [];
  let avatarUrl = "";
  const socials = {
    personnal_website: formData.get("personnal_website") as string,
    linkedin_url: formData.get("linkedin_url") as string,
    github_url: formData.get("github_url") as string,
    twitter_url: formData.get("twitter_url") as string,
    facebook_url: formData.get("facebook_url") as string,
    instagram_url: formData.get("instagram_url") as string,
  };

  const generateHash = (inputString: string) => {
    const hash = createHash("sha256");
    hash.update(inputString);
    const simpleHash = hash.digest("hex");
    return simpleHash;
  };
  for (let i = 0; i < 3; i++) {
    const photo = formData.get(`img-${i}`) as unknown as File;
    if (photo.size > 0) {
      const hash = generateHash((userId + i) as string);
      const photoStorageRef = ref(storage, `photos/${hash}`);
      const result = await uploadBytes(photoStorageRef, photo as Blob);
      photos.push(result.metadata.fullPath);
    }
  }
  const photoUrls = photos.map((url) => ({ url }));

  function normalizeDate(date: number, month: number, year: number): string {
    const transformedDate = new Date(year, month - 1, date);
    const isoDateString = transformedDate.toISOString();
    return isoDateString;
  }
  const birth = normalizeDate(
    +formData.get("birth_date")!,
    +formData.get("birth_month")!,
    +formData.get("birth_year")!
  );

  function getAllSkills() {
    const skills = [];
    skills.push(formData.get("skill-0"));
    skills.push(formData.get("skill-1"));
    skills.push(formData.get("skill-2"));
    skills.push(formData.get("skill-3"));
    skills.push(formData.get("skill-4"));
    return skills.map((skill) => ({ skill }));
  }
  const rawFormData: UserData = {
    avatar: formData.get("avatar") as unknown as File,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,

    gender: formData.get("gender") as string,
    birth: birth as string,
    about: formData.get("about") as string,
    skills: getAllSkills() as { skill: string }[],
    socials: socials,
    photos: photoUrls,
  };

  if (rawFormData.avatar.size > 0) {
    const avatarStorageRef = ref(
      storage,
      "avatars/" + generateHash(rawFormData.avatar.name)
    );
    const result = await uploadBytes(
      avatarStorageRef,
      rawFormData.avatar as Blob
    );
    avatarUrl = result.metadata.fullPath;
  } else {
    const hash = generateHash(userId as string);
    const avatarStorageRef = ref(storage, "avatars/" + hash);
    await fetch(`https://api.dicebear.com/7.x/pixel-art/svg?seed=${hash}`)
      .then((res) => res.text())
      .then(async (data) => {
        try {
          const pngBuffer = await sharp(Buffer.from(data))
            .png()
            .resize(100)
            .toBuffer();
          const result = await uploadBytes(avatarStorageRef, pngBuffer, {
            contentType: "image/png",
          });
          avatarUrl = result.metadata.fullPath;
        } catch (error) {
          console.error("Error converting SVG to PNG:", error);
          throw error;
        }
      });
  }
  try {
     await prisma.user.create({
      data: {
        id: userId,
        first_name: rawFormData.first_name,
        last_name: rawFormData.last_name,
        gender: rawFormData.gender,
        avatar_url: avatarUrl,
        birth: rawFormData.birth,
        about: rawFormData.about,
        profile_completed: true,
        skills: {
          create: [...rawFormData.skills],
        },
        photos: {
          create: [...rawFormData.photos],
        },
        socials: {
          create: {
            personal_website: rawFormData.socials?.personnal_website,
            twitter: rawFormData.socials?.twitter_url,
            linkedin: rawFormData.socials?.linkedin_url,
            github: rawFormData.socials?.github_url,
            instagram: rawFormData.socials?.instagram_url,
            facebook: rawFormData.socials?.facebook_url,
          },
        },
      },
    });
    redirect("/", RedirectType.replace);
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    throw error;
  }
}
