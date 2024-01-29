"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import formHandler from "./formHandler"
import { useEffect, useState } from "react"
import { ImageUpload } from "./imageUpload"
import { SearchSkill } from "./searchSkill"

export default function CompleteProfile() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [about, setAbout] = useState("")

    const [birth_date, setBirthDate] = useState('')
    const [birth_month, setBirthMonth] = useState('')
    const [birth_year, setBirthYear] = useState('')

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)


    const [gender, setGender] = useState("")
    const [skills, setSkills] = useState<string[]>([])

    const checkFormValid = () => {

        if (first_name != '' &&
            last_name != '' &&
            email != '' &&
            about != '' && // for now
            isValidDate(+birth_date, +birth_month, +birth_year) &&
            gender != '' &&
            skills.length == 5
        ) {

            setIsSubmitDisabled(false)
        }
    }

    useEffect(() => {
        checkFormValid()
    })

    function isValidDate(date: number, month: number, year: number) {
        // Create a new Date object with the provided values
        const inputDate = new Date(year, month - 1, date);

        // Check if the input values match the values in the Date object
        // and if the resulting date is a valid date
        const isValid =
            inputDate.getDate() === date &&
            inputDate.getMonth() === month - 1 &&
            inputDate.getFullYear() === year;

        // Check if the person is at least 16 years old
        const today = new Date();
        const minimumBirthDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
        const maximumBirthDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
        return isValid && inputDate >= minimumBirthDate && inputDate < maximumBirthDate;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff5858] to-[#f857a6] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-xl mx-auto">
                        <form action={formHandler}>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="sm:flex justify-start gap-3 ">
                                        <div className="w-full">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="first name" type="text" name="first_name" onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                        <div className="w-full mt-4 sm:mt-0" >
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="last name" type="text" name="last_name" onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input type="email" id="email" placeholder="Adresse e-mail" name="email" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="about">About</Label>
                                        <Textarea id="about" onChange={(e) => setAbout(e.target.value)} />
                                    </div>
                                    <div className="flex gap-3">
                                        <Input className="w-1/3" placeholder="JJ" type="number" name="birth_date" onChange={(e) => setBirthDate(e.target.value)} />
                                        <Input className="w-1/3" placeholder="MM" type="number" name="birth_month" onChange={(e) => setBirthMonth(e.target.value)} />
                                        <Input className="w-1/3" placeholder="AAAA" type="number" name="birth_year" onChange={(e) => setBirthYear(e.target.value)} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button type="button" variant={gender == "male" ? "destructive" : "outline"} onClick={() => setGender("male")}>Male</Button>
                                        <Button type="button" variant={gender == "female" ? "destructive" : "outline"} onClick={() => setGender("female")}>Female</Button>
                                        <Input readOnly className="hidden" type="text" name="gender" value={gender} />
                                    </div>

                                    <SearchSkill skills={skills} setSkills={setSkills} />
                                    <div className="py-2 flex justify-start items-center space-x-2">
                                        {skills.map((skill, index) => {
                                            return (
                                                <div key={index}>
                                                    <Button type="button" variant="destructive" >{skill}</Button>
                                                    <Input readOnly className="hidden" key={index} type="text" name={`skill-${index}`} value={skills[index]} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <ImageUpload name="img-1" />
                                        <ImageUpload name="img-2" />
                                        <ImageUpload name="img-3" />

                                    </div>
                                    <p className="text-xs text-gray-500">Make your profile unique</p>


                                </div>


                                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                                    <Button className="w-full" type="submit" disabled={isSubmitDisabled} >Continuer</Button>
                                    {/* <p className="mt-2">
                                    Vous avez déjà un compte ?
                                    <Link className="text-[#ff5858]" href="#">
                                        Connectez-vous.
                                    </Link>
                                </p> */}
                                </div>
                            </div>
                        </form>
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
