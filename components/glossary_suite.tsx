'use client'
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Fuse from "fuse.js"
import TermCardList from "./termcard_list"
import {GlossaryTerm} from "@/components/termcard"
import data from "@/public/glossary/terms.json"

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

    return (
        <div className="flex flex-col mx-auto gap-4 p-2">
            <input 
                className="border-2 border-slate-600 text-center text-white w-1/2 h-10 mx-auto rounded-full"
                placeholder="Search terms..."
                onKeyDown={HandleSearchKeyDown}
            />
            <TermCardList key={listTerms.length} glossary={listTerms} /> 
        </div>
    )
}
