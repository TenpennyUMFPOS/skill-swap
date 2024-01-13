"use client"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartIcon } from '@radix-ui/react-icons'
import { SpringRef} from "@react-spring/web";


export default function UserCard({ api, gone, index }:
    {
        api: SpringRef<{ x: number, y: number, scale: number, rot: number }>,
        gone: Set<number>,
        index: number
    }) {

    const like = () => {
        performAction(1);
    }
    const reject = () => {
        performAction(-1)
    }

    const performAction = (dir: number) => {
        api.start(i => {
            if (index != i) return
            gone.add(index)
            const x = (200 + window.innerWidth) * dir
            const rot = (200 + window.innerWidth) * dir / 15
            const scale = 1
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 20, tension: 80 },
            }
        })
    }
    return (
        <Card className="w-full h-full mx-auto">
            <CardContent className="relative flex-col justify-end items-end p-0  rounded-t-lg h-[556px] bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg)` }}>
                <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-black">

                </div>
                <div className="absolute bottom-0 left-0 text-white p-4">
                    <h2 className="text-2xl font-bold">John Doe, 28</h2>
                    <p className="text-sm ">
                        Software Engineer at Google. Love to travel and meet new people.
                    </p>
                </div>

            </CardContent>
            <CardFooter className="w-full h-20 bg-black flex justify-between items-center">
                <Button size="lg" variant="outline" onClick={reject}>
                    <CrossIcon className="w-6 h-6" />
                </Button>
                <Button size="lg" onClick={like}>
                    <HeartIcon className="w-6 h-6" />
                </Button>
            </CardFooter>
        </Card>
    )
}

function CrossIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
        </svg>
    )
}
