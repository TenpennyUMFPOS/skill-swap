'use client'

import React, { useEffect, useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { init } from "@/lib/features/deck-slice"
import styles from '@/styles/styles.module.css'
import UserCard from './UserCard'
import { User } from '@prisma/client'
import likeAction from "@/app/actions/like"
import rejectAction from "@/app/actions/reject";
import feedsHydration from '@/app/actions/feedsHydration'
import { Spinner } from './ui/spinner'



// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
    x: 0,
    y: 0,
    scale: 1,
    rot: 0,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
    ` rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function Deck({ innitialFeeds }: { innitialFeeds: User[] }) {
    const [feeds, setFeeds] = useState<User[]>(innitialFeeds)
    const [gone] = useState(() => new Set<number>()) // The set flags all the cards that are flicked out
    const [loading, setLoading] = useState(false)
    const [swipe, setSwipe] = useState(false)
    const [props, api] = useSprings(feeds.length, i => ({
        from: from(i),
        ...to(i),
    }))
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (swipe == true) {
            console.log(gone.size)
            if (gone.size == feeds.length) {
                setLoading(true)
                console.log("all cards are gone")
                feedsHydration().then((freshFeeds: User[]) => {
                    gone.clear();
                    setFeeds(freshFeeds)
                    api.start(i => ({
                        ...to(i),
                        from: from(i),
                    }))
                    timeout = setInterval(() => {
                        setLoading(false)
                    }, 1000)

                }).catch(err => console.log(err))
            }
            setSwipe(false)
            return () => clearInterval(timeout)
        }
    }, [swipe])
    const performLike = async (i: number) => {
        await likeAction(feeds[i])
    }
    const performReject = async (i: number) => {
        await rejectAction(feeds[i])
    }
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity, distance }) => {
        const dir = xDir < 0 ? -1 : 1
        api.start(i => {
            if (index != i) return
            if (!down && distance > 200) {
                gone.add(index)
                setSwipe(true)
                if (dir == 1) performLike(i)
                else if (dir == -1) performReject(i)
            }
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? calculateX(mx) : 0
            const rot = down ? mx / 15 : isGone ? (200 + window.innerWidth) * dir / 15 : 0
            const scale = 1
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 20, tension: down ? 800 : isGone ? 80 : 500 },
            }
        })

    })

    const calculateX = (x: number) => {
        if (Math.abs(x) > window.innerWidth / 2) {
            if (x < 0) return -window.innerWidth / 2
            if (x > 0) return window.innerWidth / 2
        }
        return x
    }
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)

    if (loading) return (<Spinner />)
    return (
        <>
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className={styles.deck} key={i} style={{ x, y }}>
                    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                    <animated.div
                        {...bind(i)}
                        style={{
                            transform: interpolate([rot, scale], trans),
                        }}
                    >
                        <UserCard api={api} gone={gone} index={i} profile={feeds[i]} setSwipe={setSwipe} />
                    </animated.div>
                </animated.div>
            ))}
        </>
    )
}

export default Deck