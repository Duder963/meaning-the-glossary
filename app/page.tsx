import GlossarySuite from "@/components/glossary_suite"

export default function Home() {
    return (
        <div>
            <h1 className="text-7xl text-center text-orange-400 font-bold">
                <a href="/">Meaning: The Glossary</a>
            </h1>
            <h2 className="text-xl text-center">An unofficial glossary for Magic: The Gathering</h2>
            <GlossarySuite />
        </div>
    )
}
