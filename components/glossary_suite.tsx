'use client'
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from 'react'
import Fuse from "fuse.js"
import TermCard from "@/components/termcard"
import {GlossaryTerm} from "@/components/termcard"
import data from "@/public/glossary/terms.json"


export default function GlossarySuite() {
    const glossary: GlossaryTerm[] = data as GlossaryTerm[]
    const linked_term = useSearchParams().get('term')
    const [listTerms, setListTerms] = useState(
        linked_term
            ? glossary.filter((t) => t.name.replace(/\s/g, "") === linked_term)
            // : [glossary[Math.floor(Math.random() * glossary.length)]]
            : glossary
    )

    // idk what type it wants so it gets the any type
    function HandleSearchKeyDown(event: any) {
        if ((event.which || event.keyCode) != 13) return

        const search: string = event.target.value
        if (!search) {setListTerms(glossary) ; return}

        const results = new Fuse(glossary, {
            keys: ["name", "description", "synonyms"],
            threshold: 0.2
        }).search(search)

        setListTerms(results.map((r) => r.item))
    }

    function AddToList(link:string) {
        const term = glossary.filter((t) => t.name.replace(/\s/g, "") === link)

        //If term exists and not in listTerms, add to list
        if (term.length && !listTerms.filter((t) => t.name.replace(/\s/g, "") === link).length) setListTerms(listTerms.concat(term))
    }

    let delay = 0.0 //Lets cards slide in one by one. Kinda screws up if reloading a massive list in place
    const cards = listTerms.map((term,i) => <TermCard key={term.name + i} term={term} delay={delay += 0.03} addToList={AddToList} />)

    return (
        <div className="flex flex-col mx-auto gap-4 p-2 w-9/10 sm:w-5/6 md:2/3 xl:w-1/3">
            <input 
                className="border-2 border-slate-600 text-center text-white h-10 rounded-full"
                placeholder="Search terms..."
                onKeyDown={HandleSearchKeyDown}
            />
            <div className="m-auto flex flex-col gap-4">
                {cards.length > 0 ? cards : <p className="text-center text-2xl">No results could be found</p>}
            </div>
        </div>
    )
}
