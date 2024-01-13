import Image from 'next/image'
import Deck from '../components/Deck'

export default function Home() {
  return (

    <>
      <main className="flex justify-center items-center h-screen bg-gray-400">
        <Deck />
      </main>
    </>
  )
}
