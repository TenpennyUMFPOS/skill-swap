"use client";

import { UserInfosDrawerContext } from "@/components/Deck";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/format-date";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useContext, useEffect, useState } from "react";
import { CakeIcon, CalendarIcon, SquareDotIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import getUserSkills from "../actions/getUserSkills";
import { Skill } from "@prisma/client";

export const ProfileInfoDrawer = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { profileInfos, setProfileInfos } = useContext(UserInfosDrawerContext);

  useEffect(() => {
    getSkills().then((res) => {
      setSkills(res);
    });
  }, []);

  const getSkills = async () => {
    const skillsQuerry = await getUserSkills(profileInfos?.id!);
    return skillsQuerry;
  };
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="hidden"
          id="open-user-infos-drawer"
        >
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent className="top-0 right-0 left-auto mt-0 mx-0 w-[400px] rounded-none bg-[#ebedef]">
        <div className="w-full  max-w-[400px] overflow-x-hidden h-screen  mt-0">
          <div className=" rounded-lg overflow-hidden">
            <DrawerHeader className="bg-[#0f0101] h-[100px] flex justify-start items-center mb-20">
              <div className="w-24 h-24 flex justify-center items-center -mb-20 bg-[#ebedef] rounded-full">
                <div
                  className="w-20 h-20  bg-[#ebedef] rounded-full bg-no-repeat bg-center bg-cover"
                  style={{
                    backgroundImage: `url(https://github.com/shadcn.png)`,
                  }}
                ></div>
              </div>
            </DrawerHeader>
            <div className="m-4 p-3 bg-white rounded-lg flex flex-col space-y-4">
              <div>
                <div className="text-xl font-semibold mb-2">
                  {profileInfos?.first_name} {profileInfos?.last_name}
                </div>
                <div className="text-sm font-medium">{profileInfos?.about}</div>
              </div>
              <Separator />
              <div className="">
                <h2 className="text-sm font-bold uppercase text-black ">
                  About
                </h2>

                <p className="text-sm font-medium mt-2">
                  {profileInfos?.about}
                </p>
              </div>
              <Separator />

              <div className="">
                <h2 className="text-sm font-bold uppercase text-black mb-3">
                  Member since
                </h2>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="text-gray-400" />
                  <p className="text-sm">
                    {profileInfos && formatDate(profileInfos.createdAt)}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="">
                <h2 className="text-sm font-bold uppercase text-black mb-3">
                  Skills
                </h2>
                <div className="flex items-center gap-2 mt-2 flex-wrap ">
                  {skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill.skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
