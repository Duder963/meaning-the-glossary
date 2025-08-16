import TermCard from "@/components/termcard"
import { GlossaryTerm } from "./termcard";

export default function TermCardList({glossary}: {glossary: GlossaryTerm[]}) {
    let delay = 0.0
    const cards = glossary.map((term,i) => <TermCard key={term.name + i} term={term} delay={delay += 0.03} />)

    return (
    <div className="m-auto w-5/6 lg:w-3/4 xl:w-1/2 flex flex-col gap-4">
            {cards.length > 0 ? cards : <p className="text-center text-2xl">No results could be found</p>}
    </div>
    )
}
