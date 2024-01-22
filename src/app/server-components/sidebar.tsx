
"use server"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Flame, Mail } from "lucide-react";
import prisma from "../db";
import { User } from "@prisma/client";
import { MatchTab } from "./match/match-Tab";
import { auth } from "@clerk/nextjs";
import { SidebarTabs } from "../client-components/tabs/sidebar-tabs";

export async function Sidebar() {
    const { userId } = auth();
    if (!userId) return
    const user: User = await prisma.user.findUnique({ where: { id: userId } }) as unknown as User

    return (
        <div className='w-1/4 h-screen bg-blue-200'>
            <div className="h-24 w-full p-4 bg-amber-600 flex justify-between items-center">
                {/* avatar */}
                <div className=" flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={user.avatar_url} />
                    </Avatar>
                    <div className="text-xl font-semibold text-slate-100">{user.first_name + " " + user.last_name}</div>
                </div>
            </div>
            <div className="">
                <SidebarTabs/>
            </div>
        </div >
    );
}
