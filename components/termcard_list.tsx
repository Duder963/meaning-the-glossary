import TermCard from "@/components/termcard"
import { GlossaryTerm } from "./termcard";

export default function TermCardList({glossary}: {glossary: GlossaryTerm[]}) {
    let delay = 0.0
    const cards = glossary.map((term) => <TermCard key={term.name} term={term} delay={delay += 0.1} />)
    console.log(delay)

    return (
    <div className="m-auto w-5/6 lg:w-3/4 xl:w-1/2 flex flex-col gap-4">
            {cards}
    </div>
    )
}
