/*
 * Glossary Suite
 * Handles searching though and displaying the glossary
 */
'use client'

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Fuse from "fuse.js"
import TermCard from "@/components/termcard"
import {GlossaryTerm} from "@/components/termcard"
import data from "@/public/glossary/terms.json"


export default function GlossarySuite() {
    const glossary: GlossaryTerm[] = data as GlossaryTerm[]
    const linked_term = useSearchParams().get('term')
    const date = new Date()
    const date_num = Number(String(date.getFullYear())
                            + String(date.getMonth())
                            + String(date.getDate()))

    // The terms actively in the list
    const [listTerms, setListTerms] = useState(
        linked_term
            ? glossary.filter((t) => t.name.replace(/\s/g, "") === linked_term)
            //hash formula stolen from https://javascript.info/task/pseudo-random-generator
            : [glossary[(date_num * 16807 % 2147483647) % glossary.length]]
    )

    // Status message above the term list
    const [listInfo, setListInfo] = useState(linked_term ? "" 
        : `Term of the Day: ${date.toDateString()}`
    )

    // idk what type this ends up as, so it gets the any type
    function HandleSearchKeyDown(event: any) {
        //If input not enter, return
        if ((event.which || event.keyCode) != 13) return

        const search: string = event.target.value
        if (!search) return

        const results = new Fuse(glossary, {
            keys: ["name", "description", "synonyms"],
            threshold: 0.2
        }).search(search)

        setListTerms(results.map((r) => r.item))
        setListInfo(results.length
            ? `Found ${results.length} Results`
            : `No results could be found`
        )
    }

    function ShowAllTerms() {
        setListTerms(glossary)
        setListInfo(`Showing all ${glossary.length} terms`)
    }

    function AddToList(link:string, source_term:string) {
        const term = glossary.filter((t) => t.name.replace(/\s/g, "") === link)

        //If term exists and not in listTerms, add to list
        if (term.length && !listTerms.filter((t) => t.name.replace(/\s/g, "") === link).length){
            const idx = listTerms.findIndex(e => e.name === source_term)
            setListTerms(listTerms.toSpliced(idx+1,0,term[0]))
        }
    }

    let delay = 0.0 //Lets cards slide in one by one. Kinda screws up if reloading a massive list in place
    const cards = listTerms.map((term) => <TermCard key={term.name} term={term} delay={delay += 0.03} addToList={AddToList} />)

    return (
        <div className="flex flex-col mx-auto gap-4 p-2 w-9/10 sm:w-5/6 md:2/3 xl:w-1/3">
            <input 
                className="border-2 border-slate-600 text-center text-white h-10 rounded-full"
                placeholder="Search terms..."
                onKeyDown={HandleSearchKeyDown}
            />
            <div className="m-auto flex flex-col gap-4">
                <h3 className="text-center text-3xl font-bold">{listInfo}</h3>
                {cards}
            </div>
            {listTerms != glossary && <button
                className="text-2xl font-bold rounded-full bg-blue-900 w-full lg:w-1/2 mx-auto"
                onClick={ShowAllTerms}>{`Show All ${glossary.length} Terms`}</button>}
        </div>
    )
}
