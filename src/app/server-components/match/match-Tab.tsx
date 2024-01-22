"use client"
import { DocumentData } from "firebase/firestore";
import { TabsContent } from "@/components/ui/tabs";
import { MatchCard } from "./match-card";

type Match = {
    id: string,
    data: DocumentData
}

export const MatchTab = ({ matches }: { matches: Match[] }) => {

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