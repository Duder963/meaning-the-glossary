import Markdown from 'react-markdown'
import './termcard.css'

export enum TermType {
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

export default function TermCard({term, delay}: {term: GlossaryTerm, delay: number}) {
    const {name, type, description, source, quote, synonyms, see_also} = term
    return (
        <div className="term-card bg-slate-700 rounded-2xl flex flex-col gap-4 mx-100 p-10 px-24"
            style={{animationDelay: `${delay}s`}}>
            <h1 className="text-center text-3xl font-bold">{name}</h1>
            <h3 className="text-2xl text-center">{type}</h3>
            <p className='whitespace-pre-line text-center'>{description.join("\n")}</p>
            <p className='text-right'>- {source}</p>
            {quote && <p><i>"{quote}"</i></p>}
            {synonyms.length > 0 && <p>Synonyms: {synonyms.join(", ")}</p>}
            {see_also.length > 0 && <p>See Also: {see_also.join(", ")}</p>}

        </div>
    )

}
