/*
 * Term Card
 * Displays the data of a term from the glossary
 * Also handles processing the data into a more usable format
 */
import reactStringReplace from 'react-string-replace'
import Link from 'next/link'
import Image from 'next/image'
import './termcard.css'
import './mana.min.css'
import linkImage from '@/public/link.svg'

export interface GlossaryTerm {
    name: string,
    type: string,
    description: string[],
    source: string,
    quote: string,
    synonyms: string[],
    see_also: string[]
}


//Delay: Delays slide in animation
//addToList: function to add term to list. Passed from parent list
export default function TermCard({term, delay, addToList}: {term: GlossaryTerm, delay: number, addToList: (s: string) => void}) {

    function ParseDescription(description: string[]) {
        //In which duder reinvents parts of markdown
        let out: any = description.join("\n")

        //Inject mana symbols
        out = reactStringReplace(out, /(\{(?:W|U|B|R|G|C)\})/gm, (match,i) => <i key={match+i} className={`ms ms-${match[1].toLowerCase()} ms-cost`} />)

        //Link to terms within glossary
        out = reactStringReplace(out, /\{(.*?)\}/, (match,i) => {
            const link: string = match
            .split(" ") //separate words into strings
            .map(w => w[0].toUpperCase()+w.slice(1)) //Jank solution to capitalize word
            .join("")
            return <Link key={match+i} onClick={(event) => {event.preventDefault(); addToList(link)}} href={`/?term=${link}`} className='underline'>{match}</Link>
        })

        //Link to external sites. TODO

        return out
    }

    const {name, type, description, source, quote, synonyms, see_also} = term
    const link_name = name.replace(/\s/g, "");
    const parsed_description = ParseDescription(description)

    //Add links to See Also
    const linked_see_also = see_also.map((term, i) => {
        const link: string = term
                            .split(" ")
                            .map(w => w[0].toUpperCase()+w.slice(1))
                            .join("")
        return <span key={term}>
            {/* Add comma before each entry after the first */}
            {!!i && ", "}
            <Link href={`/?term=${link}`} onClick={(event) => {event.preventDefault(); addToList(link)}} className='underline'>{term}</Link>
        </span>
    })

    return (
        <div 
            className="term-card bg-slate-700 rounded-2xl flex flex-col gap-1 px-4 lg:px-12 py-2 shadow-xl *:text-center"
            style={{animationDelay: `${delay}s`}}
        >
            <div>
                <a href={`/?term=${link_name}`} className='absolute right-4 lg:right-12 top-12'>
                    <Image src={linkImage} alt='Two chain links' width={32} height={32} unoptimized />
                </a>
            </div>
            <h3 className="text-3xl font-bold">{name}</h3>
            <h4 className="text-xl md:text-2xl font-bold ">{type}</h4>
            <hr />
            <p className='whitespace-pre-line text-md'>{parsed_description}</p>
            {source.length > 0 && <p className=''>— {source}</p>}
            {(synonyms.length>0 || see_also.length > 0 || quote) && <hr/>}
            {quote && <p className=''><i>"{quote}"</i></p>}
            {synonyms.length > 0 && <p className='text-md'><b>Synonyms:</b> {synonyms.join(", ")}</p>}
            {see_also.length > 0 && <p className='text-lg'><b>See Also:</b> {linked_see_also}</p>}
        </div>
    )

}
