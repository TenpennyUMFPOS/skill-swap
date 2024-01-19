import fs from "fs";
import path from "path";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), "data.json");

  const data = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(data);

  for (let data of jsonData) {
    const skills_list = [];
    const photos_list = [];
    for (let skill of data.user_skills) {
      if (skill !== "") {
        skills_list.push({ skill: skill });
      }
    }
    console.log(skills_list);
    for (let photo of data.photos) {
      photos_list.push({ url: photo });
    }
    const createdAt = new Date(data.created_at).toISOString();
    const updatedAt = new Date(data.updated_at).toISOString();
    const user = await prisma.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: "secret123",
        gender: data.gender,
        job: data.job,
        jobDes: data.jobDes,
        avatar_url: data.avatar,
        birth: data.birth,
        country: data.country,
        city: data.city,

        about: data.about,
        createdAt: createdAt,
        updatedAt: updatedAt,
        skills: {
          create: {
            ...skills_list,
          },
        },
        photos: {
          create: {
            ...photos_list,
          },
        },
        socials: {
          create: {
            personal_website: data.socials.personal_website,
            twitter: data.socials.twitter,
            linkedin: data.socials.linkedin,
            github: data.socials.github,
            instagram: data.socials.instagram,
            facebook: "www.facebook.com",
          },
        },
      },
    });
  }
}
