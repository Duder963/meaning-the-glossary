import GlossarySuite from "@/components/glossary_suite"
import { Suspense } from 'react'

export default function Home() {
    return (
        <div>
            <Suspense>
            <GlossarySuite />
            </Suspense>
        </div>
    )
}
