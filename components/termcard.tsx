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
        <div 
            className="term-card bg-slate-700 rounded-2xl flex flex-col gap-1 px-12 py-2 shadow-xl"
            style={{animationDelay: `${delay}s`}}
        >
            <h3 className="text-center text-3xl font-bold">{name}</h3>
            <h4 className="text-xl font-bold text-center">{type}</h4>
            <hr />
            <p className='whitespace-pre-line text-center text-lg'>{description.join("\n")}</p>
            <p className='text-center'>— {source}</p>
            {(synonyms.length>0 || see_also.length > 0 || quote) && <hr/>}
            {quote && <p className='text-center'><i>"{quote}"</i></p>}
            {synonyms.length > 0 && <p className='text-center text-lg'><b>Synonyms:</b> {synonyms.join(", ")}</p>}
            {see_also.length > 0 && <p className='text-center text-lg'><b>See Also:</b> {see_also.join(", ")}</p>}
        </div>
    )

}
