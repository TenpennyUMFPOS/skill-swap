import fs from "fs";
import path from "path";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), "data.json");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    for (let data of jsonData) {
      const skills_list = data.user_skills.map((skill: String) => ({ skill }));
      const photos_list = data.photos.map((url: String) => ({ url }));
      const createdAt = new Date(data.created_at).toISOString();
      const updatedAt = new Date(data.updated_at).toISOString();
      const user = await prisma.user.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,

          gender: data.gender,
          avatar_url: data.avatar,
          birth: data.birth,
          about: data.about,
          createdAt: createdAt,
          updatedAt: updatedAt,
          skills: {
            create: [...skills_list],
          },
          photos: {
            create: [...photos_list],
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
    return NextResponse.json(
      { message: "created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
