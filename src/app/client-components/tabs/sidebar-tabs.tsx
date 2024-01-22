"use client"

import { MatchTab } from "@/app/server-components/match/match-Tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@clerk/nextjs";
import { DocumentData, query, where, or, onSnapshot } from "firebase/firestore";
import { Flame, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { matchesCollectionRef } from "../../../../initializeFirebase.local";


type Match = {
    id: string,
    data: DocumentData
}

export const SidebarTabs = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const { userId } = useAuth();
    if (!userId) return

    useEffect(() => {
        const q = query(matchesCollectionRef,
            or(where('user_id', '==', userId),
                where('matchedUser_id', '==', userId)
            )
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // setMatches(snapshot.docChanges().map(doc => ({ id: doc.id, data: doc.data() })))
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    setMatches((prev) => [...prev, { id: change.doc.id, data: change.doc.data() }])
                }
            })
        })
        return () => { unsubscribe() }
    }, [])
    return (
        <Tabs className="w-full " defaultValue="matches">
            <TabsList className="flex gap-4 justify-start">
                <TabsTrigger value="matches">
                    <div className="flex items-center gap-2">
                        <Flame />
                        <span>Matches</span>
                    </div>
                </TabsTrigger>
                <TabsTrigger value="messages">
                    <div className="flex items-center gap-2">
                        <Mail />
                        <span> Messages</span>
                    </div>
                </TabsTrigger>
            </TabsList>

            <MatchTab matches={matches} />
            <TabsContent className="p-4 transition-all duration-300 ease-in-out" value="messages">
                <h2 className="text-xl font-bold">welcome to the messages tab</h2>
                <p className="text-gray-500">This is the tab where there are the list of all messages</p>
            </TabsContent>
        </Tabs>
    );
}