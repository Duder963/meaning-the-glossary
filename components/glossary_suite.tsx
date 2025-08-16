'use client'
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Fuse from "fuse.js"
import TermCard from "@/components/termcard"
import {GlossaryTerm} from "@/components/termcard"
import data from "@/public/glossary/terms.json"
import { link } from "fs"

export default function GlossarySuite() {
    const glossary: GlossaryTerm[] = data as GlossaryTerm[]
    const linked_term = useSearchParams().get('term')
    const [listTerms, setListTerms] = useState(
        linked_term ? glossary.filter((t) => t.name.replace(/\s/g, "") === linked_term) : glossary
    )


    function HandleSearchKeyDown(event) {
        console.log("searching")
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
        if (term.length) setListTerms(listTerms.concat(term))
    }

    let delay = 0.0
    const cards = glossary.map((term,i) => <TermCard key={term.name + i} term={term} delay={delay += 0.03} addToList={AddToList} />)

    return (
        <div className="flex flex-col mx-auto gap-4 p-2">
            <input 
                className="border-2 border-slate-600 text-center text-white w-1/2 h-10 mx-auto rounded-full"
                placeholder="Search terms..."
                onKeyDown={HandleSearchKeyDown}
            />
            <div className="m-auto w-5/6 lg:w-3/4 xl:w-1/2 flex flex-col gap-4">
                {cards.length > 0 ? cards : <p className="text-center text-2xl">No results could be found</p>}
            </div>
        </div>
    )
}
