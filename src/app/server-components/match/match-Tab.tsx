"use client"
import { DocumentData, QueryDocumentSnapshot, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { matchesCollectionRef } from "../../../../initializeFirebase.local";
import { TabsContent } from "@/components/ui/tabs";
import { MatchCard } from "./match-card";
import { useSession } from "next-auth/react";


type Match = {
    id: string,
    data: DocumentData
}
export const MatchTab = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    /* const { data } = useSession();
    if (!data) return */

    useEffect(() => {
        /* const q = query(matchesCollectionRef, where("user_id", "==", 1)); */
        const unsubscribe = onSnapshot(matchesCollectionRef, snapshot => {
            setMatches(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
        })
        return () => { unsubscribe() }
    }, [])
    return (
        <TabsContent className="p-2 transition-all duration-300 ease-in-out" value="matches">
            <div className="flex gap-4 flex-wrap">
                {matches.map((match) => {
                    return (
                        <MatchCard data={match.data} key={match.id} />
                    );
                })
                }
            </div>
        </TabsContent>
    );
}