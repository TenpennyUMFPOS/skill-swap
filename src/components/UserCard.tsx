"use client"
import { CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { SpringRef } from "@react-spring/web";
import { User } from "@prisma/client";
import likeAction from "@/app/actions/like";
import rejectAction from "@/app/actions/reject";
import { ShowMatchToast } from "@/app/server-components/match/show-match-toast";
import { useEffect, useState } from "react";
import getUserPhotos from "@/app/actions/getUserPhotos";
import GetAvatarURL from "@/app/actions/getAvatarURL";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function UserCard({
  api,
  gone,
  index,
  profile,
  setSwipe,
}: Readonly<{
  api: SpringRef<{ x: number; y: number; scale: number; rot: number }>;
  gone: Set<number>;
  index: number;
  profile: User;
  setSwipe: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [showedPhoto, setShowedPhoto] = useState<string>();
  const [focused, setFocused] = useState<number>(0);

  const querryPhotos = async () => {
    const photosUrls = await getUserPhotos(profile.id);
    if (photosUrls && photosUrls.length > 0) {
      return photosUrls;
    } else {
      const avatar = await GetAvatarURL(profile.id);
      return [avatar];
    }
  };
  const displayPhoto = (i?: number) => {
    if (i === undefined) setShowedPhoto(photos[0]);
    else setShowedPhoto(photos[i]);
  };
  useEffect(() => {
    querryPhotos().then((res) => {
      setPhotos(res);
      displayPhoto();
    });
  }, []);
  const like = async () => {
    performAction(1);
    const isMatch = await likeAction(profile.id);

    if (isMatch) {
      ShowMatchToast();
    }
  };
  const reject = async () => {
    performAction(-1);
    await rejectAction(profile.id);
  };
  function calculateAge(birthdate: string) {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  const performAction = (dir: number) => {
    api.start((i) => {
      if (index != i) return;
      gone.add(index);
      setSwipe(true);
      const x = (200 + window.innerWidth) * dir;
      const rot = ((200 + window.innerWidth) * dir) / 15;
      const scale = 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 20, tension: 80 },
      };
    });
  };
  const photosStatusBarLength = () => {
    switch (photos.length) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
    }
  };
  return (
    <Card className="relative w-full h-full mx-auto">
      <div className="absolute z-10 flex space-x-1 w-full h-3 ">
        {photos.map((photo, i) => {
          return (
            <div
              key={i}
              className={`${
                focused == i ? "bg-white" : "bg-slate-200"
              }  ${photosStatusBarLength()} rounded-sm cursor-pointer`}
              onClick={() => displayPhoto(i)}
            ></div>
          );
        })}
      </div>
      <CardContent
        className="relative flex-col justify-end items-end p-0  rounded-t-lg h-[556px] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${showedPhoto})` }}
      >
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute bottom-0 left-0 text-white p-4">
          <h2 className="text-2xl font-bold">
            {profile.first_name}, {calculateAge(profile.birth)}
          </h2>
          <p className="text-sm ">{profile.about}</p>
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
  );
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
