
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CompleteProfile() {
    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5858] to-[#f857a6] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-xl mx-auto">

                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="sm:flex justify-start gap-3 ">
                                    <div className="w-full">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="first name" type="text" />
                                    </div>
                                    <div className="w-full mt-4 sm:mt-0" >
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="last name" type="text" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" placeholder="Adresse e-mail" />
                                </div>
                                <div>
                                    <Label htmlFor="about">About</Label>
                                    <Textarea id="about" />
                                </div>
                                <div className="flex gap-3">
                                    <Input className="w-1/3" placeholder="JJ" />
                                    <Input className="w-1/3" placeholder="MM" />
                                    <Input className="w-1/3" placeholder="AAAA" />
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline">Male</Button>
                                    <Button variant="outline">Female</Button>
                                </div>

                                <Button variant="outline">+ Add skills</Button>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="border-dashed border-2 border-gray-300 rounded-md p-12 flex justify-center items-center">
                                        <PlusIcon className="h-6 text-gray-400" />
                                    </div>
                                    <div className="border-dashed border-2 border-gray-300 rounded-md p-12 flex justify-center items-center">
                                        <PlusIcon className="h-6 text-gray-400" />
                                    </div>
                                    <div className="border-dashed border-2 border-gray-300 rounded-md p-12 flex justify-center items-center">
                                        <PlusIcon className="h-6 text-gray-400" />
                                    </div>

                                </div>
                                <p className="text-xs text-gray-500">Add at least 2 photos to continue</p>


                            </div>


                            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                                <Button className="w-full">Continuer</Button>
                                <p className="mt-2">
                                    Vous avez déjà un compte ?
                                    <Link className="text-[#ff5858]" href="#">
                                        Connectez-vous.
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

function InstagramIcon(props: any) {
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
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}


function PlusIcon(props: any) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
