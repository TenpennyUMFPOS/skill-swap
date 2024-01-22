"use client"
import GetUser from "@/app/actions/getUser";
import prisma from "@/app/db";
import { User } from "@prisma/client";
import { DocumentData } from "firebase/firestore";

import { useEffect, useState } from "react";
export const MatchCard = ({ data }: { data: DocumentData }) => {
    const [user, setUser] = useState<{ id: string, first_name: string, last_name: string, avatar_url: string } | null>();
    useEffect(() => {
        GetUser(data.matchedUser_id).then(user => setUser(user))
    }, [])
    return (
        <div className="w-24 h-24 bg-no-repeat bg-center bg-cover rounded-md" style={{ backgroundImage: `url(${user?.avatar_url})` }}>

        </div>
    );
}