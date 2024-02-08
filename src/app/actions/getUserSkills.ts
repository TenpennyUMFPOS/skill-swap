"use server";

import prisma from "../db";

export default async function getUserSkills(userId: string) {
  const skills = await prisma.skill.findMany({ where: { user_id: userId } });
  return skills;
}
