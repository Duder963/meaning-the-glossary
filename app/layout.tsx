import type { Metadata } from "next";
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Meaning: The Glossary",
    description: "An unofficial glossary for Magic: The Gathering",
};

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex flex-col gap-2 place-content-between w-screen mx-auto">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center text-orange-400 font-bold">
                            {/* next/link doesn't reload page on click */}
                            <a href="/">Meaning: The Glossary</a>
                        </h1>
                        <h2 className="text-md lg:text-xl text-center">
                            An unofficial glossary for Magic: The Gathering
                        </h2>
                    </div>
                    <div className="flex mx-auto gap-4 [&_p]:font-bold [&_p]:text-xl">
                        <Link href={"/about"}><p>About</p></Link>
                        <Link href={"/credits"}><p>Credits</p></Link>
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
