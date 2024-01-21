import Image from 'next/image'
import Deck from '../components/Deck'
import { Session, getServerSession } from 'next-auth'
import { handler } from './api/auth/[...nextauth]/route'
import { PrismaClient, type User } from '@prisma/client'
import prisma from './db'
import { Sidebar } from './server-components/sidebar'


export default async function Home() {
  const session = await getServerSession(handler) as Session
  if (!session.user) return

  const user: User = prisma.user.findUnique({ where: { email: session.user.email! } }) as unknown as User
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


  return (

    <>
      <div className='flex'>
        <Sidebar />
        <main className="w-3/4 relative flex justify-center items-center overflow-x-hidden h-screen bg-gray-400">
          <Deck innitialFeeds={feeds} />
        </main>   
      </div>
    </>
  )
}
