import Deck from "../components/Deck";
import prisma from "./db";
import { Sidebar } from "./server-components/sidebar";
import { auth } from "@clerk/nextjs";
import { type User } from "@prisma/client";
import { RedirectType, redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  if (!userId) return;
  const user: User = (await prisma.user.findUnique({
    where: { id: userId },
  })) as unknown as User;
  if (!user || !user.profile_completed)
    redirect("/complete-profile", RedirectType.replace);
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
              ).map((reject) => reject.rejectedUser_id),
            },
          },
        },
      ],
    },
  });

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-3/4 relative flex justify-center items-center overflow-x-hidden h-screen bg-gray-400">
        <Deck innitialFeeds={feeds} />
      </main>
    </div>
  );
}
