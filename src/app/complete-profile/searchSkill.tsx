
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
export const SearchSkill = ({ skills, setSkills }: { skills: string[], setSkills: Dispatch<SetStateAction<string[]>> }) => {
    const [searchSkill, setSearchSkill] = useState('')
    const [searchResult, setSearchResult] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const searchSkillFromApi = () => {
        setIsLoading(true)
        let myHeaders = new Headers();
        myHeaders.append("apikey", "nmbAL1LiUpwcHIsciAnKU4rQcjF8yNsY");
        const normalizedSearch = replaceSpacesWithPercent20(searchSkill)
        let requestOptions = {

            method: 'GET',
            redirect: 'follow',
            headers: myHeaders

        } as RequestInit;

        fetch(`https://api.apilayer.com/skills?q=${normalizedSearch}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setSearchResult(result)
                setIsLoading(false)

            })
            .catch(error => console.log('error', error));
    }

    function replaceSpacesWithPercent20(inputString: string) {
        // Use a regular expression to replace spaces with "%20"
        return inputString.replace(/\s/g, "%20");
    }
    const selectSkill = (skill: string) => {
        if (!skills.includes(skill) && skills.length < 5)
            setSkills((prev) => ([...prev, skill]))
    }
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setIsLoading(false)
            setSearchResult([])
            setSearchSkill('')
        }
    }
    return (
        <Dialog onOpenChange={(open) => handleOpenChange(open)}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">+ Add skills</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Select your skills</DialogTitle>
                    <DialogDescription>
                        Enter the name the skill you want to add to your profile.
                        You have {5 - skills.length} left.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-col items-start space-y-2">
                    <div>

                        <Label htmlFor="skill" className="sr-only">
                            skill
                        </Label>
                        <Input
                            id="skill"
                            type="search"
                            name="skill"
                            onChange={(e) => setSearchSkill(e.target.value)}
                        />
                        <div className="py-2 grid grid-cols-3 gap-4">
                            {isLoading ? <Spinner /> :
                                searchResult?.map((res, index) => {
                                    return (
                                        <Button key={index} variant="outline" type="button" onClick={() => selectSkill(res)}> {res}</Button>
                                    )
                                })

                            }
                        </div>
                    </div>
                    <Button type="button" variant="default" onClick={searchSkillFromApi}>search</Button>
                </div>

                {/* <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
}