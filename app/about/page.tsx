import Image from "next/image"
export default function About() {
    return (
        <div className="flex flex-col items-center gap-4 mx-auto w-9/10 lg:w-1/3 [&>p]:text-lg">
            <h1 className="text-5xl text-center font-bold">About</h1>
            <p>You know when you're talking to someone about their hobby, and they get really into it and start talking like this like this?</p>
            <Image 
                src={"/cardboard-language.jpg"}
                alt="A comic from Cardboard Crack of a Magic player saying various terms to another person."
                width={360}
                height={360}
                className="content-center"
            />
            <p>I'm sure you've been there. I'm sure you've been that guy at some point. Hobbies are super cool, but as anyone getting into one can attest, learning the slang and vernacular those in the hobby use can be a real barrier to entry, especially for a game as wordy and established as Magic. I'm certainly familiar with this, as I'm someone who enjoys fighting games, and with all the various games and mechanics these games provide, there can be a lot to learn to get a true understanding of the game, and it would really help if there was a central repository for all of these words.</p>
            <p>Fighting game community member Infilament recognized this, and created a wonderful glossary where anyone can quickly find definitions to any words they want. Inspired by his site and my own journey learning Magic, I decided to create my own version for Magic.</p>
        </div>
    )
}
