import {GlossaryTerm} from "@/components/termcard"
import TermCardList from "@/components/termcard_list"
import data from "@/public/glossary/terms.json"

export default function Home() {
    const glossary: GlossaryTerm[] = data as GlossaryTerm[]
    return (
        <div>
            <h1 className="text-5xl text-center text-orange-400 font-bold">Meaning: The Glossary</h1>
            <h3 className="text-xl text-center">An unofficial glossary for Magic: The Gathering</h3>
            <div className="flex flex-col w-1/3 mx-auto">
                <input className="border-2 border-slate-600 text-center" placeholder="Search terms..." />
            </div>
            <TermCardList glossary={glossary} />
        </div>
    )
}
