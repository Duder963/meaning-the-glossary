import Link from "next/link";

export default function Contact() {
    return (
        <>
            <h1 className="text-3xl text-center font-bold">Contact</h1>
            <br/>
            <div className="*:text-center *:text-2xl *:underline *:text-blue-300">
                <p><Link href={"https://github.com/Duder963/meaning-the-glossary"}>Project Github</Link></p>
            </div>
            <br/>
            <h2 className="text-3xl text-center font-bold">Got a Suggestion?</h2>
            <p className="text-xl p-4 w-3/4 mx-auto text-center">Regrettably, I am not perfect. As such, there are certainly words and features I am missing, errors in the descriptions, and links to add. If you see something you think needs improvement, please fill out the form below and I'll review your suggestion as soon as possible.</p>
            <iframe className="mx-auto bg-slate-50" src="https://docs.google.com/forms/d/e/1FAIpQLSfZ1-sOtZL6vx5cuDmmFZT9IUeIZf4Lt5OElGSuFGciNAtRqw/viewform?embedded=true" width="80%" height="800">Loading Form...</iframe>
        </>
    )
}
