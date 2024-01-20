import Image from 'next/image'
import Deck from '../components/Deck'
import { getServerSession } from 'next-auth'
import { handler } from './api/auth/[...nextauth]/route'
import { PrismaClient, type User } from '@prisma/client'
import prisma from './db'

export default async function Home() {
  const session = await getServerSession(handler)
  if (!session) return

  const user = prisma.user.findUnique({ where: { email: session.user.email } })
  const feeds = await prisma.user.findMany({
    take: 10,
    where: {
      AND: [
        {
          NOT: {
            id: {
              in: (await prisma.like.findMany({ select: { likedUser_id: true }, where: { user_id: user.id } })).map(like => like.likedUser_id)
            }
          },
        },
        {
          NOT: {
            id: {
              in: (await prisma.reject.findMany({ select: { rejectedUser_id: true }, where: { user_id: user.id } })).map(like => like.rejectedUser_id)
            }
          }
        }
      ]
    }
  });
  /* const feeds = await prisma.user.findMany({ take: 10 }) */

  return (

    <>
      <main className="relative flex justify-center items-center overflow-x-hidden h-screen bg-gray-400">
        <Deck innitialFeeds={feeds} />
      </main>
    </>
  )
}
