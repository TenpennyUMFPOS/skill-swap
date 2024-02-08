import { UserInfosDrawerContext } from "@/components/Deck";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useContext, useEffect } from "react";
import { CakeIcon, CalendarIcon, SquareDotIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export const ProfileInfoDrawer = () => {
  const { profileInfos, setProfileInfos } = useContext(UserInfosDrawerContext);

  return (

    <Drawer direction='right' >
      <DrawerTrigger asChild>
        <Button variant='outline' className="hidden" id="open-user-infos-drawer">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className='top-0 right-0 left-auto mt-0 mx-0 w-[400px] rounded-none bg-[#ebedef]'>

        <div className='w-full  max-w-[400px] overflow-x-hidden h-screen  mt-0'>
          <div className=" rounded-lg overflow-hidden">
            <DrawerHeader className="bg-[#0f0101] h-[100px] flex justify-start items-center mb-20">
              <div className="w-24 h-24 flex justify-center items-center -mb-20 bg-[#ebedef] rounded-full">

                <div className="w-20 h-20  bg-[#ebedef] rounded-full bg-no-repeat bg-center bg-cover"
                  style={{ backgroundImage: `url(https://github.com/shadcn.png)` }}>

                </div>
              </div>
            </DrawerHeader>
            <div className="m-4 p-3 bg-white rounded-lg flex flex-col space-y-4">
              <div>
                <div className="text-xl font-semibold">EL Hadji Mamadou Sarr</div>
                <div className="text-sm font-medium">Software enginer</div>
              </div>
              <Separator />
              <div className="">
                <h2 className="text-sm font-semibold uppercase text-gray-400">À propos de moi</h2>
                <p className="text-sm">19</p>
                <p className="text-sm font-semibold mt-2">Emergency Commissions Open</p>
                <p className="text-sm">Cash.app/$CoVisorr</p>
                <p className="text-sm text-gray-400 mt-4">... • ...</p>
              </div>
              <Separator />

              <div className="">
                <h2 className="text-sm font-semibold uppercase text-gray-400">Membre depuis</h2>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="text-gray-400" />
                  <p className="text-sm">5 déc. 2018</p>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <CakeIcon className="text-gray-400" />
                  <p className="text-sm">19 avr. 2022</p>
                </div>
              </div>
              <Separator />
              <div className="">
                <h2 className="text-sm font-semibold uppercase text-gray-400">Rôles</h2>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">B</Badge>
                  <Badge variant="secondary">0</Badge>
                  <Badge variant="secondary">Legend</Badge>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">GameAnnouncements</Badge>
                </div>
              </div>
              <Separator />
              <div className="">
                <h2 className="text-sm font-semibold uppercase text-gray-400">Note</h2>
                <p className="text-sm text-gray-400 mt-2">Clique pour ajouter une note</p>
              </div>
              <Separator />
              <div className="px-4 py-3 bg-[#202225]">
                <Button className="w-full">Envoyer un message à @B.</Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}