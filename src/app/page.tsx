import Image from 'next/image'
import Deck from '../components/Deck'

export default function Home() {
  return (

    <>
      <main className="relative flex justify-center items-center overflow-x-hidden h-screen bg-gray-400">
        <Deck />
      </main>
    </>
  )
}
