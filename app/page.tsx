import GlossarySuite from "@/components/glossary_suite"
import { Suspense } from 'react'

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <Suspense>
            <GlossarySuite />
            </Suspense>
        </div>
    )
}
