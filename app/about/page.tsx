import Image from "next/image"
import Link from "next/link"

export default function About() {
    return (
        <div className="flex flex-col items-center gap-4 mx-auto w-9/10 lg:w-1/3 [&>p]:text-lg">
            <h1 className="text-5xl text-center font-bold">About</h1>
            <p>You know when you're talking to someone about their hobby, and they get really into the conversation and start talking like this?</p>
            <Image 
                src={"/cardboard-language.jpg"}
                alt="A comic from Cardboard Crack of a Magic player saying various terms to another person."
                width={360}
                height={360}
                className="content-center"
            />
            <p>I'm sure you've been there. Heck, I'm sure you've been That Guy at some point. Hobbies are super cool, but as anyone into a one can attest, learning the various pieces of slang people in the hobby use can be a real barrier to entry, especially when it comes to a game as established, complex, and wordy as Magic The Gathering. I'm certainly familiar with this struggle as someone who got into fighting games several years ago. With the copious shared concepts between various games in addition to the exclusive mechanics these games include, it can feel like there's a mountain of information you have to learn to get a true understanding of the game, and it would really help if there was a central repository for all of these words.</p>
            <p>Fighting game community member Infilament recognized this, and created a <Link href={"https://glossary.infil.net/"} className="underline text-blue-300">wonderful glossary</Link> where anyone can quickly find definitions to any words they come across, as well as any word in those definitions. It's a site I've found immensely useful for years, and so inspired by his site and my own journey learning Magic, I decided to create my own version for Magic.</p>
        </div>
    )
}
