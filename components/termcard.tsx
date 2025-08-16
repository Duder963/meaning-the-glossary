import reactStringReplace from 'react-string-replace'
import './termcard.css'
import './mana.min.css'
import Link from 'next/link'

export enum TermType {
    Ability = "Ability",
    Concept = "Concept",
    Format = "Format",
    Keyword = "Keyword",
    Slang = "Slang",
    Type = "Type",
}

export interface GlossaryTerm {
    name: string,
    type: TermType
    description: string[],
    source: string,
    quote: string,
    synonyms: string[],
    see_also: string[]
}


export default function TermCard({term, delay, addToList}: {term: GlossaryTerm, delay: number, addToList: (s: string) => void}) {
    function ParseDescription(description: string[]) {
        //In which duder reinvents parts of markdown
        let out: any = description.join("\n")

        //Inject mana symbols. I learned some regex for this. Kill me
        out = reactStringReplace(out, /(\{(?:W|U|B|R|G|C)\})/gm, (match,i) => <i key={match+i} className={`ms ms-${match[1].toLowerCase()} ms-cost`} />)

        //Link to terms within glossary
        out = reactStringReplace(out, /\{(.*?)\}/, (match,i) => {
            const link: string = match
            .split(" ")
            .map(w => w[0].toUpperCase()+w.slice(1))
            .join("")
            return <a key={match+i} onClick={(event) => {event.preventDefault(); addToList(link)}} href={`/?term=${link}`} className='underline'>{match}</a>
        })

        //Link to external sites. TODO

        //surprise tool that might help us later: “
        return out
    }

    const {name, type, description, source, quote, synonyms, see_also} = term
    const parsed_description = ParseDescription(description)

    //Add links to See Also
    const linked_see_also = see_also.map((term, i) => {
        const link: string = term
                            .split(" ")
                            .map(w => w[0].toUpperCase()+w.slice(1))
                            .join("")
        return <span key={term}>
            {!!i && ", "}
            <a href={`/?term=${link}`} onClick={(event) => {event.preventDefault(); addToList(link)}} className='underline'>{term}</a>
        </span>
    })

    return (
        <div 
            className="term-card bg-slate-700 rounded-2xl flex flex-col gap-1 px-12 py-2 shadow-xl overflow-hidden"
            style={{animationDelay: `${delay}s`}}
        >
            <h3 className="text-center text-3xl font-bold">{name}</h3>
            <h4 className="text-xl font-bold text-center">{type}</h4>
            <hr />
            <p className='whitespace-pre-line text-center text-lg'>{parsed_description}</p>
            {source.length > 0 && <p className='text-center'>— {source}</p>}
            {(synonyms.length>0 || see_also.length > 0 || quote) && <hr/>}
            {quote && <p className='text-center'><i>"{quote}"</i></p>}
            {synonyms.length > 0 && <p className='text-center text-lg'><b>Synonyms:</b> {synonyms.join(", ")}</p>}
            {see_also.length > 0 && <p className='text-center text-lg'><b>See Also:</b> {linked_see_also}</p>}
        </div>
    )

}
