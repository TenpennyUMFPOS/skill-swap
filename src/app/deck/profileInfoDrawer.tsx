import { UserInfosDrawerContext } from "@/components/Deck";
import { Button } from "@/components/ui/button";
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


export const ProfileInfoDrawer = () => {
    const { profileInfos, setProfileInfos } = useContext(UserInfosDrawerContext);

    return (

        <Drawer direction='right'>
            <DrawerTrigger asChild>
                <Button variant='outline' className="hidden" id="open-user-infos-drawer">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent className='top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
                <div className='mx-auto w-full p-5 max-w-[500px] overflow-x-hidden h-screen'>
                    <DrawerHeader>
                        <DrawerTitle>Theme Color Options</DrawerTitle>
                        <DrawerDescription>
                            * Selected option will be applied to all layout elements (navbar, toolbar, etc.). You can also create your own theme options and color
                            schemes.
                        </DrawerDescription>
                    </DrawerHeader>
                    {/* <div className='p-4 pb-0 space-y-4'>
                        <div className='bg-muted flex items-center justify-center rounded-lg h-32'>
                            <p>Image 1</p>
                        </div>
                        <div>{profileInfos?.id}</div>
                    </div> */}
                    <div className="max-w-xs bg-[#36393F] text-white rounded-lg overflow-hidden">
      <div className="p-4 bg-[#202225] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage alt="User Avatar" src="/placeholder.svg?height=64&width=64" />
          </Avatar>
          <div>
            <h1 className="text-lg font-bold">Brian.</h1>
            <p className="text-sm text-gray-400">covisorr</p>
            <p className="text-sm">He/him</p>
          </div>
        </div>
        <SquareDotIcon className="text-gray-400" />
      </div>
      <div className="px-4 py-2 border-t border-gray-600">
        <h2 className="text-sm font-semibold uppercase text-gray-400">À propos de moi</h2>
        <p className="text-sm">19</p>
        <p className="text-sm font-semibold mt-2">Emergency Commissions Open</p>
        <p className="text-sm">Cash.app/$CoVisorr</p>
        <p className="text-sm text-gray-400 mt-4">... • ...</p>
      </div>
      <div className="px-4 py-2 border-t border-gray-600">
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
      <div className="px-4 py-2 border-t border-gray-600">
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
      <div className="px-4 py-2 border-t border-gray-600">
        <h2 className="text-sm font-semibold uppercase text-gray-400">Note</h2>
        <p className="text-sm text-gray-400 mt-2">Clique pour ajouter une note</p>
      </div>
      <div className="px-4 py-3 bg-[#202225]">
        <Button className="w-full">Envoyer un message à @B.</Button>
      </div>
    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}