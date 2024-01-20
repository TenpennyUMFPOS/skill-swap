import Image from 'next/image'
import Deck from '../components/Deck'
import { getServerSession } from 'next-auth'
import { handler } from './api/auth/[...nextauth]/route'
import { PrismaClient, type User } from '@prisma/client'


export default async function Home() {
  const session = await getServerSession(handler)
  let feeds: User[] = []
  if (session) {
    const prisma = new PrismaClient();
    feeds = await prisma.user.findMany({ take: 10 })

  }
  return (

    <>
      <main className="relative flex justify-center items-center overflow-x-hidden h-screen bg-gray-400">
        <Deck feeds={feeds}>
      </main>
    </>
  )
}
